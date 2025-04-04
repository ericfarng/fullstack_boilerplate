import { type IQuestionModel, QuestionDb } from "../model/QuestionModel";
import { AbstractController } from "./AbstractController";

export class QuestionController extends AbstractController<IQuestionModel, QuestionDb> {

	constructor() {
		super(new QuestionDb());
	}
	
	getByAssignment(assignmentId: number): IQuestionModel[] | undefined{
		return this.modelDb.getByAssignment(assignmentId);
	}

};
