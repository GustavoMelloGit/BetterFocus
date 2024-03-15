import { test } from 'vitest';
import { makeFakeTodoVo } from '../../../../__test__/makeFakeTodoVo';
import { spySaveTodo } from '../../application/TodoService';

describe('useTodo', () => {
  test('should be able to remove a todo', () => {
    spySaveTodo.mockResolvedValueOnce(makeFakeTodoVo());
  });
  test('should update todo list after creating a new one', () => {});
});
