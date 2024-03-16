import { useEffect, useState } from 'react';
import { makeTodoService } from '../../application/TodoService';
import { TodoId, TodoPriority } from '../../infra/entities/TodoEntity';
import { TodoVo } from '../../infra/entities/TodoVo';

const service = makeTodoService();

export function useTodo(): UseTodo {
  const [allTodos, setAllTodos] = useState<TodoVo[]>([]);

  async function removeTodo(todoId: TodoId) {
    try {
      await service.removeTodo(todoId);
      setAllTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } catch (e) {
      console.error(e);
    }
  }

  async function addTodo(message: string) {
    try {
      const savedTodo = await service.saveTodo({
        message,
        priority: TodoPriority.MEDIUM,
      });
      setAllTodos((prev) => [...prev, savedTodo]);
    } catch (e) {
      console.error(e);
    }
  }

  async function completeTodo(todoId: string) {
    try {
      const completedTodo = await service.completeTodo(todoId);
      setAllTodos((prev) => {
        const index = prev.findIndex((todo) => todo.id === todoId);
        prev[index] = completedTodo;
        return prev;
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    service.getAllTodos().then((todos): void => {
      setAllTodos(todos);
    });
  }, []);

  return {
    removeTodo,
    addTodo,
    completeTodo,
    allTodos,
  };
}

type UseTodo = {
  removeTodo: (todoId: TodoId) => Promise<void>;
  addTodo: (message: string) => Promise<void>;
  completeTodo: (todoId: TodoId) => Promise<void>;
  allTodos: TodoVo[];
};
