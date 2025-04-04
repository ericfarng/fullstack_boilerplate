import { apiUrlFactory } from "./path";

export type AnswerModel = {
	id: number;
	question_id: number;
	answer_content: string;
	is_correct: number;

};


// answer api urls
export const answerGetApiUrl = apiUrlFactory("/answer/:id");
export const answerGetByQuestionApiUrl = apiUrlFactory("/answer/question/:id");
