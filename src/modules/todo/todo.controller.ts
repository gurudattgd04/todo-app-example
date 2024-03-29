import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../../utils/logger';
import { createTodo } from './todo.service';
import { CreateTodoBody } from './todo.schema';

export async function createToDoHandler(
  request: FastifyRequest<{
    Body: CreateTodoBody;
  }>,
  reply: FastifyReply,
) {
  try {
    const todo = await createTodo(request.body);
    return reply.code(201).send(todo);
  } catch (e) {
    logger.error(e, 'createToDoHandler : error creating todo');
    return reply.code(400).send({ message: 'Error creating todo' });
  }
}
