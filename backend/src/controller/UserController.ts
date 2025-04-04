import { type IUserModel, UserDb } from "../model/UserModel";
import { AbstractController } from "./AbstractController";

export class UserController extends AbstractController<IUserModel, UserDb> {

	constructor() {
		super(new UserDb());
	}

	getByEmail(email: string): IUserModel | undefined {
		return this.modelDb.getByEmail(email);
	}
};
