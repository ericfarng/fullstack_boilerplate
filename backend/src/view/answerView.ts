import type { FastifyInstance, FastifyRequest } from "fastify";
import { AnswerController } from "../controller/AnswerController";

export async function answerView(server: FastifyInstance) {
  const answerController = new AnswerController();

  server.get("/answer", (_req, reply) => {
    return reply.send(answerController.getAll());
  });

  server.get("/answer/:id", (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const { id } = request.params;
    const numericId = Number.parseInt(id, 10);

    if (Number.isNaN(numericId)) {
      return reply.code(400).send({ error: "Invalid ID" });
    }

    const answer = answerController.get(numericId);
    if (!answer) {
      return reply.code(404).send({ error: "Answer not found" });
    }

    return reply.send(answer);
  });

  server.get("/answer/question/:questionId", (request: FastifyRequest<{ Params: { questionId: string } }>, reply) => {
    const { questionId } = request.params;
    const numericId = Number.parseInt(questionId, 10);

    if (Number.isNaN(numericId)) {
      return reply.code(400).send({ error: "Invalid ID" });
    }

    const answer = answerController.getByQuestion(numericId);
    if (!answer) {
      return reply.code(404).send({ error: "Question not found" });
    }

    return reply.send(answer);
  });
}
