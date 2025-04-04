import type { FastifyInstance, FastifyRequest } from "fastify";
import { QuestionController } from "../controller/QuestionController";

export async function questionView(server: FastifyInstance) {
  const questionController = new QuestionController();

  server.get("/question", (_req, reply) => {
    return reply.send(questionController.getAll());
  });

  server.get("/question/:id", (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const { id } = request.params;
    const numericId = Number.parseInt(id, 10);

    if (Number.isNaN(numericId)) {
      return reply.code(400).send({ error: "Invalid ID" });
    }

    const question = questionController.get(numericId);
    if (!question) {
      return reply.code(404).send({ error: "Question not found" });
    }

    return reply.send(question);
  });

  server.get("/question/assignment/:assignmentId", (request: FastifyRequest<{ Params: { assignmentId: string } }>, reply) => {
    const { assignmentId } = request.params;
    const numericId = Number.parseInt(assignmentId, 10);

    if (Number.isNaN(numericId)) {
      return reply.code(400).send({ error: "Invalid ID" });
    }

    const question = questionController.getByAssignment(numericId);
    if (!question) {
      return reply.code(404).send({ error: "Assignment not found" });
    }

    return reply.send(question);
  });
}
