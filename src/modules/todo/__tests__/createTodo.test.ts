import { describe, expect, it, vi } from 'vitest';
import { createServer } from '../../../../utils/createServer';
import * as TodoService from '../todo.service';
import { nanoid } from 'nanoid';

describe("test POST call for '/api/todos'", () => {
  it('should call createTodo service', async () => {
    const createTodoSpy = vi.spyOn(TodoService, 'createTodo');

    const todo = {
      _id: 'mock_id',
      title: 'mock title',
      shortId: nanoid(),
      complete: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(createTodoSpy.getMockName()).toEqual('createTodo');

    createTodoSpy.mockResolvedValue(todo);

    const server = await createServer();
    await server.ready();

    const payload = {
      title: 'A Test Payload',
    };

    const response = await server.inject({
      method: 'POST',
      url: '/api/todos',
      payload,
    });

    expect(response.json()).toEqual(todo);
    expect(createTodoSpy).toHaveBeenCalledWith(payload);
  });
});
