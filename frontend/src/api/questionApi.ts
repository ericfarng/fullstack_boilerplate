import { apiUrlFactory } from "./path";

export enum QuestionType {
	SelectOne = 1,
	FreeText = 2,
}
export type QuestionModel = {
	id: number;
	assignment_id: number;
	question_content: string;
	question_value: number;
	question_type: QuestionType;
};
// question api urls
export const questionGetApiUrl = apiUrlFactory("/question/:id");
export const questionGetByAssignmentApiUrl = apiUrlFactory("/question/assignment/:assignmentId");
