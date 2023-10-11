import { Response, Request } from 'express';
import UserService from '../services/user.service';
import {
  IUserSignup,
  IUserId,
  IUserChangePassword,
  IUserLogin,
  IUserRestorePassword,
  IQuery
} from '../types/users.type';
import { sendResponse } from '../utils/responceSender.util';

interface Signup extends Request {
  body: IUserSignup;
}
interface ChangePassword extends Request {
  body: IUserChangePassword;
}
interface Login extends Request {
  body: IUserLogin;
}

interface RestorePassword extends Request {
  body: IUserRestorePassword;
}
export class UserController {
  constructor(private userService: UserService) {}

  async login(req: Login, res: Response) {
    const data = req.body;
    const response = await this.userService.login(data);
    return sendResponse(res, response);
  }

  async signup(req: Signup, res: Response) {
    const data = req.body;
    const response = await this.userService.signup(data);
    return sendResponse(res, response);
  }

  async updateUser(req: Request, res: Response) {
    const data = { ...req.body, ...req.params };
    const response = await this.userService.updateUser(data);
    return sendResponse(res, response);
  }

  async changePassword(req: ChangePassword, res: Response) {
    const data = { ...req.body, ...req.params };
    const response = await this.userService.changePassword(data);
    return sendResponse(res, response);
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const data: IUserId = { id };
    const response = await this.userService.deleteOne(data);
    return sendResponse(res, response);
  }

  async emailConfirmation(req: Request, res: Response) {
    const { token } = req.params;
    const response = await this.userService.emailConfirmation(token);
    return sendResponse(res, response);
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    const response = await this.userService.forgotPassword(email);
    return sendResponse(res, response);
  }

  async restorePassword(req: RestorePassword, res: Response) {
    const data: IUserRestorePassword = { ...req.body, ...req.params };
    const response = await this.userService.restorePassword(data);
    return sendResponse(res, response);
  }

  async getUser(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) {
      return sendResponse(res, null);
    }
    const response = await this.userService.getOneByToken(token.split(' ')[1]);
    return sendResponse(res, response);
  }

  async getAllUsers(req: Request, res: Response) {
    const { query } = req;
    const response = await this.userService.getAll(query as unknown as IQuery);
    return sendResponse(res, response);
  }

  async getCount(req: Request, res: Response) {
    const { query } = req;
    const response = await this.userService.getCount(query as unknown as IQuery);
    return sendResponse(res, response);
  }
}

const userController = new UserController(new UserService());
export default userController;
