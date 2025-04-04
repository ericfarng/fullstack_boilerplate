import {
	type IAssignmentModel,
	AssignmentDb,
	type IGradedAssignmentModel,
} from "../model/AssignmentModel";
import { LlmService } from "../service/LlmService";
import { AbstractController } from "./AbstractController";
import { AnswerController } from "./AnswerController";
import { QuestionController } from "./QuestionController";

export class AssignmentController extends AbstractController<
	IAssignmentModel,
	AssignmentDb
> {
	constructor() {
		super(new AssignmentDb());
	}

	async grade(
		questionAnswerList: Record<number, number | string>,
	): Promise<IGradedAssignmentModel> {
		const questionController = new QuestionController();
		const answerController = new AnswerController();
        const llmService = new LlmService();

		const gradedAssignment: IGradedAssignmentModel = {
			selectOneCount: 0,
			selectOneCorrectCount: 0,
			totalPoints: 0,
			correctPoints: 0,
			freeTextFeedback: "",
		};

		for (const [questionIdStr, answerValue] of Object.entries(
			questionAnswerList,
		)) {
			const questionId = Number.parseInt(questionIdStr, 10);
			const question = questionController.get(questionId);

            if (question === undefined) {
                throw Error("question not found")
            }

            gradedAssignment.totalPoints += question.question_value;

			// Only check correctness for multiple-choice answers (numbers)
			if (typeof answerValue === "number") {
                gradedAssignment.selectOneCount++;
                    const answer = answerController.get(answerValue);
                if (answer === undefined) {
                    throw Error("answer not found")
                }
    
				if (answer.is_correct) {
					gradedAssignment.selectOneCorrectCount++;
                    gradedAssignment.correctPoints += question.question_value;
				}
			} else {
                const llmGrade = await llmService.grade(question.question_content, answerValue)
                gradedAssignment.freeTextFeedback += llmGrade.feedback;
                gradedAssignment.correctPoints += llmGrade.percent_score * question.question_value;
            }
		}


		return gradedAssignment;
	}
}
