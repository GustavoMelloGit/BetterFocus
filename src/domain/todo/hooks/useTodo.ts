import { useEffect, useState } from 'react';
import { makeTodoService } from '../service/TodoService';
import { Todo, TodoId } from '../types/Todo';

const service = makeTodoService();

export function useTodo(): UseTodo {
  const [availableTodos, setAvailableTodos] = useState<Todo[]>([]);
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);

  const checkTodo = (id: TodoId) => {
    service.toggleTodoStatus(id);
    setAvailableTodos((prev) => {
      const todo = prev.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      return [...prev];
    });
  };

  const removeTodo = (id: TodoId) => {
    service.removeTodo(id);
    setAvailableTodos((prev) => prev.filter((todo) => todo.id !== id));
    setDeletedTodos((prev) => {
      const todo = availableTodos.find((todo) => todo.id === id);
      if (todo) {
        return [...prev, todo];
      }
      return prev;
    }); // TODO: Ajustar como a lógica de remoção de um todo é feita
  };

  const addTodo = (message: string) => {
    const todo = service.saveTodo({ message });
    setAvailableTodos((prev) => [...prev, todo]);
  };

  const updateTodo = (id: TodoId, message: string) => {
    service.updateTodoMessage(id, message);
    setAvailableTodos((prev) => {
      const todo = prev.find((todo) => todo.id === id);
      if (todo) {
        todo.message = message;
      }
      return [...prev];
    });
  };

  useEffect(() => {
    setAvailableTodos(service.getAvailableTodos());
    setDeletedTodos(service.getDeletedTodos());
  }, [setAvailableTodos]);

  return {
    checkTodo,
    removeTodo,
    addTodo,
    updateTodo,
    availableTodos,
    deletedTodos,
  };
}

type UseTodo = {
  checkTodo: (id: TodoId) => void;
  removeTodo: (id: TodoId) => void;
  addTodo: (message: string) => void;
  updateTodo: (id: TodoId, message: string) => void;
  availableTodos: Todo[];
  deletedTodos: Todo[];
};
