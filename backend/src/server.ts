import fastify, { type FastifyBaseLogger, type FastifyInstance, type FastifyTypeProviderDefault } from "fastify";
import cors from "@fastify/cors";
// import type { Server, IncomingMessage, ServerResponse } from "http";
import { userView } from "./view/userView";
import { assignmentView } from "./view/assignmentView";
import { questionView } from "./view/questionView";
import { answerView } from "./view/answerView";

const server = fastify();
const PORT = +(process.env.BACKEND_SERVER_PORT ?? 3001);

server.register(cors);
userView(server);
assignmentView(server);
questionView(server);
answerView(server);

server.get("/", async () => {
  return "OK\n";
});

server.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at http://localhost:${PORT}`);
});
