import { type IUserAnswerModel, UserAnswerDb } from "../model/UserAnswerModel";
import { AbstractController } from "./AbstractController";

export class UserAnswerController extends AbstractController<IUserAnswerModel, UserAnswerDb> {

    constructor() {
        super(new UserAnswerDb());
    }
};
