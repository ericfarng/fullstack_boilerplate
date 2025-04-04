import type { FastifyInstance, FastifyRequest } from "fastify";
import { AssignmentController } from "../controller/AssignmentController";

export async function assignmentView(server: FastifyInstance) {
	const assignmentController = new AssignmentController();

	server.get("/assignment", (_req, reply) => {
		return reply.send(assignmentController.getAll());
	});

	server.get(
		"/assignment/:id",
		(request: FastifyRequest<{ Params: { id: string } }>, reply) => {
			try {
				const { id } = request.params;
				const numericId = Number.parseInt(id, 10);

				if (Number.isNaN(numericId)) {
					return reply.code(400).send({ error: "Invalid ID" });
				}

				const assignment = assignmentController.get(numericId);
				if (!assignment) {
					return reply.code(404).send({ error: "Assignment not found" });
				}

				return reply.send(assignment);
			} catch (err) {
				console.error("Grading failed:", err);
				return reply
					.code(500)
					.send({ error: "Grading failed. Please try again." });
			}
		},
	);

	server.put(
		"/assignment/:id/grade",
		async (
			request: FastifyRequest<{
				Params: { id: string };
				Body: Record<number, number | string>;
			}>,
			reply,
		) => {
			const { id } = request.params;
			const numericId = Number.parseInt(id, 10);

			if (Number.isNaN(numericId)) {
				return reply.code(400).send({ error: "Invalid ID" });
			}

			const questionAnswerList = request.body;
			console.log("Received answers for grading:", questionAnswerList);

			const gradedAssignment =
				await assignmentController.grade(questionAnswerList);

			console.log("Graded Answers:", gradedAssignment);

			return reply.send(gradedAssignment);
		},
	);
}
