import { AbstractDb, type IAbstractModel } from "./AbstractModel";
import { db } from "./db-client";

export interface IUserAnswerModel extends IAbstractModel {
	user_id: number;
	answer_id: number;
	answer_text: string;
}

export class UserAnswerDb extends AbstractDb<IUserAnswerModel> {
	constructor() {
		super("user_answer");
	}
}
