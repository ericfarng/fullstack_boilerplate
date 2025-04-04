import { AbstractDb, type IAbstractModel } from "./AbstractModel";
import { db } from "./db-client";

export interface IQuestionModel extends IAbstractModel {
	assignment_id: number;
	question_content: string;
	question_value: number;
	question_type: number;
}

export class QuestionDb extends AbstractDb<IQuestionModel> {
	constructor() {
		super("question");
	}

	getByAssignment(assignmentId: number): IQuestionModel[] | undefined {
		const stmt = db.prepare(
			`SELECT * FROM ${this.tableName} WHERE assignment_id = :assignmentId`,
		);
		return stmt.all({ assignmentId }) as IQuestionModel[];
	}
}
