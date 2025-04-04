import { AbstractDb, type IAbstractModel } from "./AbstractModel";
import { db } from "./db-client";

export interface IUserModel extends IAbstractModel {
	name: string;
	email: string;
}

export class UserDb extends AbstractDb<IUserModel> {
	constructor() {
		super("user");
	}

	getByEmail(email: string): IUserModel | undefined {
		const stmt = db.prepare("SELECT * FROM user WHERE email = :email");
		const user = stmt.get({ email }) as IUserModel | undefined;
		return user;
	}
}
