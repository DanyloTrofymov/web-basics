import HttpService from './http.service'
import type {
	IResponceCurrentUser, IResponceCount, IResponceUsers,
} from '../common/types/responce.type'
import {
	BACKEND_KEYS,
} from '../common/consts/app-keys.const'
import type {
	IUserChangePassword,
	IUserEmail,
	IUserLogin,
	IUserRestorePassword,
	IUserSignup,
	IUserUpdate,
	QueryFields,
} from '../common/types/user.type'

class UserService extends HttpService {
	public async getAllUsers(query: QueryFields,): Promise<IResponceUsers> {
		const link = this.queryBuilder(BACKEND_KEYS.USER, query,)
		return this.get(
			{
				url: link,
			},
			true,
		)
	}

	public async getCountUsers(query: QueryFields,): Promise<IResponceCount> {
		const link = this.queryBuilder(BACKEND_KEYS.USERS_COUNT, query,)
		return this.get(
			{
				url: link,
			},
			true,
		)
	}

	public async login(body: IUserLogin,): Promise<IResponceCurrentUser> {
		return this.post({
			url:  BACKEND_KEYS.LOGIN,
			data: body,
		},)
	}

	public async signup(body: IUserSignup,): Promise<IResponceCurrentUser> {
		return this.post({
			url:  BACKEND_KEYS.SIGNUP,
			data: body,
		},)
	}

	public async forgotPassword(body: IUserEmail,): Promise<IResponceCurrentUser> {
		return this.post({
			url:  BACKEND_KEYS.FORGOT_PASSWORD,
			data: body,
		},)
	}

	public async restorePassword(body: IUserRestorePassword,): Promise<IResponceCurrentUser> {
		return this.post({
			url:  `${BACKEND_KEYS.FORGOT_PASSWORD}/${body.token}`,
			data: body,
		},)
	}

	public async confirmEmail(token: string,): Promise<IResponceCurrentUser> {
		return this.get({
			url: `${BACKEND_KEYS.CONFIRM_EMAIL}/${token}`,
		},)
	}

	public async changePassword(body: IUserChangePassword,): Promise<IResponceCurrentUser> {
		return this.patch(
			{
				url:  `${BACKEND_KEYS.CHANGE_PASSWORD}/${body.id}`,
				data: body,
			},
			true,
		)
	}

	public async updateUser(body: IUserUpdate,): Promise<IResponceCurrentUser> {
		return this.patch(
			{
				url:  `${BACKEND_KEYS.USER}/${body.id}`,
				data: body,
			},
			true,
		)
	}

	public async deleteUser(id: string,): Promise<IResponceCurrentUser> {
		return this.delete(
			{
				url:  `${BACKEND_KEYS.USER}/${id}`,
				data: null,
			},
			true,
		)
	}

	public async getUser(): Promise<IResponceCurrentUser> {
		return this.get(
			{
				url: BACKEND_KEYS.USER,
			},
			true,
		)
	}

	private queryBuilder(link: string, query: QueryFields,): string {
		let newLink = link
		if (query.search) {
			newLink = `${newLink}?search=${encodeURIComponent(query.search,)}`
		}
		if (query.skip) {
			newLink = `${newLink}${query.search ?
				'&' :
				'?'}skip=${query.skip}`
		}
		if (query.take) {
			newLink = `${newLink}${query.search || query.skip ?
				'&' :
				'?'}take=${query.take}`
		}
		return newLink
	}
}
export default new UserService()
