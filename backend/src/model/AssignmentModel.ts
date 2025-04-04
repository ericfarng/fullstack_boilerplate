import { AbstractDb, type IAbstractModel } from "./AbstractModel";
import { db } from "./db-client";

export interface IAssignmentModel extends IAbstractModel {
	title: string;
}

export interface IGradedAssignmentModel {
	selectOneCount: number;
  selectOneCorrectCount: number;
  totalPoints: number;
  correctPoints: number;
  freeTextFeedback: string;
}

export class AssignmentDb extends AbstractDb<IAssignmentModel> {
	constructor() {
		super("assignment");
	}
}
