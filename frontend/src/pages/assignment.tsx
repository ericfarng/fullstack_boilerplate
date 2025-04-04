import {
	assignmentGetApiUrl,
	assignmentGradeApiUrl,
	type IGradedAssignmentModel,
	type AssignmentModel,
} from "@/api/assignmentApi";
import {
	questionGetByAssignmentApiUrl,
	QuestionType,
	type QuestionModel,
} from "@/api/questionApi";
import { rootPath } from "@/api/path";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { answerGetByQuestionApiUrl, type AnswerModel } from "@/api/answerApi";

export function AssignmentPage() {
	const { id: assignmentId } = useParams();
	if (!assignmentId) throw new Error("Quiz id param is required");

	const [assignment, setAssignment] = React.useState<AssignmentModel | null>(
		null,
	);

	const [questionList, setQuestionList] = React.useState<QuestionModel[]>([]);
	const [currentQuestion, setCurrentQuestion] =
		React.useState<QuestionModel | null>(null);

	const [answerList, setAnswerList] = React.useState<AnswerModel[]>([]);
	const [selectedAnswer, setSelectedAnswer] =
		React.useState<AnswerModel | null>(null);

	const [currentFreeTextAnswer, setCurrentFreeTextAnswer] = React.useState("");

	const [questionAnswerRecord, setQuestionAnswerRecord] = React.useState<
		Record<number, number | string>
	>({});

	const [gradedAssignment, setGradedAssignment] =
		React.useState<IGradedAssignmentModel | null>(null);

	const [error, setError] = React.useState<Error | null>(null);

	React.useEffect(() => {
		fetch(assignmentGetApiUrl({ id: assignmentId }))
			.then((res) => res.json())
			.then(setAssignment)
			.then()
			.catch(setError);
	}, [assignmentId]);

	React.useEffect(() => {
		if (assignment) {
			fetch(
				questionGetByAssignmentApiUrl({
					assignmentId: assignment.id.toString(),
				}),
			)
				.then((res) => res.json())
				.then((questionList) => {
					setQuestionList(questionList);
					setCurrentQuestion(questionList[0]);
				})
				.catch(setError);
		}
	}, [assignment]);

	React.useEffect(() => {
		if (currentQuestion) {
			setCurrentFreeTextAnswer("");
			fetch(answerGetByQuestionApiUrl({ id: currentQuestion.id.toString() }))
				.then((res) => res.json())
				.then((answerList) => {
					setAnswerList(answerList);
				})
				.catch(setError);
		}
	}, [currentQuestion]);

	React.useEffect(() => {
		if (questionList.length === 0) return;

		const unansweredQuestion = questionList.find(
			(q) => questionAnswerRecord[q.id] === undefined,
		);

		if (unansweredQuestion) {
			setCurrentQuestion(unansweredQuestion);
		} else {
			setCurrentQuestion(null);
			handleSubmit();
		}
	}, [questionAnswerRecord, questionList]);

	const handleSubmit = async () => {
		if (!assignment) return;

		try {
			const res = await fetch(
				assignmentGradeApiUrl({ id: assignment.id.toString() }),
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(questionAnswerRecord),
				},
			);

			if (!res.ok) {
				throw new Error("Failed to submit answers");
			}

			const result: IGradedAssignmentModel = await res.json();
			console.log("Submitted successfully:", result);

			setGradedAssignment(result);
		} catch (err) {
			console.error("Submit failed:", err);
		}
	};

	if (error)
		return (
			<div className="text-red-500 p-4">
				<p className="font-bold mb-1">An error has occurred:</p>
				<p>{error.message}</p>
			</div>
		);

	if (!assignment) return <div className="text-center p-8">Loading...</div>;

	return (
		<Card className="w-[600px] mx-auto">
			<CardHeader className="pb-8">
				<CardTitle>Quiz #{assignment.id}</CardTitle>
				<CardDescription>Quiz details below...</CardDescription>
			</CardHeader>
			<CardContent>
				<div>
					<p className="font-semibold text-lg">Quiz name:</p>
					<p>{assignment.title}</p>
				</div>

				{currentQuestion && (
					<div className="mt-4">
						<p className="font-semibold text-lg">
							Question: ({currentQuestion.question_value} points)
						</p>
						<p className="mb-4">{currentQuestion.question_content}</p>

						{currentQuestion.question_type === QuestionType.SelectOne && (
							<div>
								<p className="font-semibold text-lg mb-2">Answers:</p>
								<div className="space-y-2">
									{answerList.map((answer) => (
										<label
											key={answer.id}
											className="flex items-center gap-2 cursor-pointer"
										>
											<input
												type="radio"
												name={`question-${currentQuestion.id}`}
												value={answer.id}
												checked={
													questionAnswerRecord[currentQuestion.id] === answer.id
												}
												onChange={() =>
													setQuestionAnswerRecord((prev) => ({
														...prev,
														[currentQuestion.id]: answer.id,
													}))
												}
											/>
											{answer.answer_content}
										</label>
									))}
								</div>
							</div>
						)}
						{currentQuestion.question_type === QuestionType.FreeText && (
							<div className="mt-4">
								<label
									htmlFor={`question-${currentQuestion.id}`}
									className="block font-semibold mb-2"
								>
									Your Answer:
								</label>
								<textarea
									id={`question-${currentQuestion.id}`}
									className="w-full p-2 border rounded-md"
									rows={4}
									value={currentFreeTextAnswer}
									onChange={(e) => setCurrentFreeTextAnswer(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault(); // prevent newline
											setQuestionAnswerRecord((prev) => ({
												...prev,
												[currentQuestion.id]: currentFreeTextAnswer,
											}));
										}
									}}
								/>
							</div>
						)}
					</div>
				)}
				{gradedAssignment && (
					<div className="mt-6 p-4 border border-green-300 bg-green-50 rounded-lg space-y-2">
						<h2 className="text-lg font-bold text-green-700">
							Grading Summary
						</h2>
						<p>
							<span className="font-medium">Multiple Choice Questions:</span>{" "}
							{gradedAssignment.selectOneCount}
						</p>
						<p>
							<span className="font-medium">Multiple Choice Correct:</span>{" "}
							{gradedAssignment.selectOneCorrectCount}
						</p>
						<p>
							<span className="font-medium">Total Points:</span>{" "}
							{gradedAssignment.totalPoints}
						</p>
						<p>
							<span className="font-medium">Correct Points:</span>{" "}
							{gradedAssignment.correctPoints}
						</p>
						{gradedAssignment.freeTextFeedback && (
							<>
								<span className="font-medium">Q&A Result:</span>{" "}
								<pre className="italic text-sm text-gray-700">
									{gradedAssignment.freeTextFeedback}
								</pre>
							</>
						)}
					</div>
				)}
				{(currentQuestion == null && gradedAssignment == null) &&  (
					<div>Grading...</div>
				)}
			</CardContent>
			<CardFooter className="flex justify-between pt-8">
				<Link
					to={rootPath.pattern}
					className="text-muted-foreground hover:text-blue-600"
				>
					Back to home page
				</Link>
			</CardFooter>
		</Card>
	);
}
