import { renderHook, waitFor } from '@testing-library/react';
import { test } from 'vitest';
import { makeFakeTodoVo } from '../../../../__test__/factories/makeFakeTodoVo';
import {
  spyCompleteTodo,
  spyGetAllTodos,
  spyRemoveTodo,
  spySaveTodo,
} from '../../../../__test__/services/fakeTodoService';
import { TodoPriority } from '../../infra/entities/TodoEntity';
import { useTodo } from './useTodo';

describe('useTodo', () => {
  test('should fill allTodos on hook render', async () => {
    const todo = makeFakeTodoVo();
    spyGetAllTodos.mockResolvedValueOnce([todo]);
    const { result } = renderHook(() => useTodo());

    await waitFor(() => {
      expect(result.current.allTodos).toEqual([todo]);
    });
  });
  test('should be able to remove a todo', async () => {
    const todo = makeFakeTodoVo();
    spyGetAllTodos.mockResolvedValueOnce([todo]);
    spyRemoveTodo.mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useTodo());

    result.current.removeTodo(todo.id);

    await waitFor(() => {
      expect(spyRemoveTodo).toBeCalledWith(todo.id);
      expect(result.current.allTodos).toEqual([]);
    });
  });

  test('should be able to add a todo', async () => {
    const todo = makeFakeTodoVo({
      message: 'message',
      priority: TodoPriority.MEDIUM,
    });
    spyGetAllTodos.mockResolvedValueOnce([]);
    spySaveTodo.mockResolvedValueOnce(todo);
    const { result } = renderHook(() => useTodo());

    result.current.addTodo(todo.message);
    await waitFor(() => {
      expect(spySaveTodo).toBeCalledWith({
        message: todo.message,
        priority: todo.priority,
      });
      expect(result.current.allTodos).toEqual([todo]);
    });
  });

  test('should be able to complete a todo', async () => {
    const todo = makeFakeTodoVo({
      completed: false,
    });
    spyGetAllTodos.mockResolvedValueOnce([todo]);
    spyCompleteTodo.mockResolvedValueOnce({ ...todo, completed: true });
    const { result } = renderHook(() => useTodo());

    await waitFor(() => {
      result.current.completeTodo(todo.id);
    });
    expect(result.current.allTodos).not.toEqual([todo]);
    expect(result.current.allTodos[0].completed).toBe(true);
  });
});
