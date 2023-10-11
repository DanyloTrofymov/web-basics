import { DeleteResult, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ERRORS, HttpError } from '../utils/error.util';
import { User } from '../entities/User.entity';
import { generateToken, hashPassword } from '../utils/auth.util';
import { TemplateType, sendEmail } from '../utils/mailer.util';
import {
  IUserSignup,
  IUserId,
  IUserChangePassword,
  IUserUsername,
  IUserLogin,
  IUser,
  IUserRestorePassword,
  IUserUpdate,
  IQuery
} from '../types/users.type';

export default class UserService {
  public async getOneById(data: IUserId): Promise<User | null> {
    return User.findOneBy({ id: data.id });
  }

  public async getOneByToken(token: string): Promise<User | null> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new HttpError(403, 'Restore error', ERRORS.BAD_TOKEN);
    }
    const responce = await this.getOneById(decoded as IUserId);
    return responce;
  }

  public async getOneByUsername(data: IUserUsername): Promise<User | null> {
    return User.findOneBy({ username: data.username });
  }

  public async login(data: IUserLogin): Promise<IUser> {
    const responce = await this.getOneByUsername(data);
    if (responce === null) {
      throw new HttpError(403, 'Incorrect username or password', ERRORS.BAD_PASSWORD);
    }
    const matchPass = await compare(data.password, responce.password);
    if (!matchPass) {
      throw new HttpError(403, 'Incorrect username or password', ERRORS.BAD_PASSWORD);
    }
    if (responce.isActive === false) {
      const token = generateToken(responce);
      const mailUrl = `${process.env.FRONTEND_URL}/confirmation/${token}`;
      await sendEmail(responce.email, TemplateType.Confirm, mailUrl);
      throw new HttpError(403, 'Inactive account. Check mail', ERRORS.UNAUTHORIZED);
    }
    const token = generateToken(responce);
    const user = {
      username: responce.username,
      id: responce.id,
      token
    };
    return user;
  }

  public async signup(data: IUserSignup): Promise<IUser> {
    const find = await this.getOneByUsername(data);
    if (find !== null) {
      throw new HttpError(400, 'Username already exists');
    }
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    const responce = User.create({ ...data });
    await responce.save();
    const token = generateToken(responce);
    const mailUrl = `${process.env.FRONTEND_URL}/confirmation/${token}`;
    await sendEmail(data.email, TemplateType.Confirm, mailUrl);
    const user = {
      username: responce.username,
      id: responce.id
    };
    return user;
  }

  public async updateUser(data: IUserUpdate): Promise<UpdateResult> {
    const user = await this.getOneById(data);
    if (user === null) {
      throw new HttpError(400, 'User not found');
    }
    if (data.username !== user.username) {
      const find = await this.getOneByUsername(data);
      if (find !== null) {
        throw new HttpError(400, 'Username already exists');
      }
    }
    if (data.email !== user.email) {
      const find = await this.getOneByUsername(data);
      if (find !== null) {
        throw new HttpError(400, 'Username already exists');
      }
    }
    return User.update({ id: data.id }, { username: data.username, email: data.email });
  }

  public async changePassword(data: IUserChangePassword): Promise<UpdateResult> {
    const user = await this.getOneById(data);
    if (user === null) {
      throw new HttpError(400, 'User not found');
    }
    const matchPass = await compare(data.oldPassword, user.password);
    if (!matchPass) {
      throw new HttpError(403, 'Incorrect password', ERRORS.BAD_PASSWORD);
    }
    const hashedPassword = await hashPassword(data.password);
    return User.update({ id: data.id }, { password: hashedPassword });
  }

  public async deleteOne(data: IUserId): Promise<DeleteResult> {
    return User.delete({ id: data.id });
  }

  public async emailConfirmation(token: string): Promise<IUser> {
    const responce = await this.getOneByToken(token);
    if (responce === null) {
      throw new HttpError(403, 'Confirmation error', ERRORS.BAD_TOKEN);
    }
    User.update({ id: responce.id }, { isActive: true });
    const newToken = generateToken(responce);
    const user = {
      username: responce.username,
      id: responce.id,
      token: newToken
    };
    return user;
  }

  public async forgotPassword(email: string): Promise<IUser> {
    if (!email) {
      throw new HttpError(400, 'Email is required');
    }
    const user = await User.findOneBy({ email });
    if (user === null) {
      throw new HttpError(400, 'User not found');
    }
    const token = generateToken(user);
    const mailUrl = `${process.env.FRONTEND_URL}/forgot-password/${token}`;
    await sendEmail(email, TemplateType.RestorePassword, mailUrl);
    return user;
  }

  public async restorePassword(data: IUserRestorePassword): Promise<IUser> {
    const responce = await this.getOneByToken(data.token);
    if (responce === null) {
      throw new HttpError(403, 'Restore error', ERRORS.BAD_TOKEN);
    }
    if (data.password !== data.repeatPassword || !data.password) {
      throw new HttpError(403, 'Incorrect password', ERRORS.BAD_PASSWORD);
    }
    const hashedPassword = await hashPassword(data.password);
    User.update({ id: responce.id }, { password: hashedPassword });
    const newToken = generateToken(responce);
    const user = {
      username: responce.username,
      id: responce.id,
      token: newToken
    };
    return user;
  }

  public async getUserByToken(data: IUserId): Promise<IUser> {
    const user = await this.getOneById(data);
    if (user === null) {
      throw new HttpError(400, 'User not found');
    }
    return user;
  }

  public async getAll(query: IQuery): Promise<User[]> {
    const todosQueryBuilder = this.queryBuilder(query);
    return todosQueryBuilder.getMany();
  }

  public async getCount(query: IQuery): Promise<number> {
    const todosQueryBuilder = this.queryBuilder(query);
    return todosQueryBuilder.getCount();
  }

  private queryBuilder(query: IQuery): SelectQueryBuilder<User> {
    let todosQueryBuilder = User.createQueryBuilder('user');

    if (query.skip) {
      todosQueryBuilder = todosQueryBuilder.skip(query.skip);
    }
    if (query.take) {
      todosQueryBuilder = todosQueryBuilder.take(query.take);
    }

    return todosQueryBuilder;
  }
}
