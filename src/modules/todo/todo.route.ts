import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createToDoHandler } from './todo.controller';
import { createTodoSchema } from './todo.schema';

export function todoRoute(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) {
  app.post(
    '/',
    {
      schema: createTodoSchema,
    },
    createToDoHandler,
  );
  done();
}
