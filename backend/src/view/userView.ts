import type { FastifyInstance, FastifyRequest } from "fastify";
import { UserController } from "../controller/UserController";

export async function userView(server: FastifyInstance) {
  const userController = new UserController();

  server.get("/user/:email", (request: FastifyRequest<{ Params: { email: string } }>, reply) => {
    const { email } = request.params;
    const user = userController.getByEmail(email);

    if (!user) {
      return reply.code(404).send({ error: `User not found: ${email}` });
    }

    return reply.send(user);
  });
}
