import { AbstractDb, type IAbstractModel } from "./AbstractModel";
import { db } from "./db-client";

export interface IAnswerModel extends IAbstractModel {
	question_id: number;
	answer_content: string;
	is_correct: number;
}

export class AnswerDb extends AbstractDb<IAnswerModel> {
	constructor() {
		super("answer");
	}

//   getByQuestion(questionid: number): IAnswerModel | undefined {
//     const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE question_id = :questionId`);
//     return stmt.get({ questionid }) as IAnswerModel | undefined;
//   }

  	getByQuestion(questionId: number): IAnswerModel[] | undefined {
		const stmt = db.prepare(
			`SELECT * FROM ${this.tableName} WHERE question_id = :questionId`,
		);
		return stmt.all({ questionId }) as IAnswerModel[];
	}

}
