import { type IAnswerModel, AnswerDb } from "../model/AnswerModel";
import { AbstractController } from "./AbstractController";

export class AnswerController extends AbstractController<IAnswerModel, AnswerDb> {

    constructor() {
        super(new AnswerDb());
    }
    
    getByQuestion(questionId: number): IAnswerModel[] | undefined {
        return this.modelDb.getByQuestion(questionId);
    }
};
