import { apiUrlFactory } from "./path";

export type AssignmentModel = {
	id: number;
	title: string;
};

export interface IGradedAssignmentModel {
	selectOneCount: number;
	selectOneCorrectCount: number;
	totalPoints: number;
	correctPoints: number;
	freeTextFeedback: string;
}

// assignment api urls
export const assignmentGetApiUrl = apiUrlFactory("/assignment/:id");
export const assignmentGetAllApiUrl = apiUrlFactory("/assignment");

export const assignmentGradeApiUrl = apiUrlFactory("/assignment/:id/grade");
