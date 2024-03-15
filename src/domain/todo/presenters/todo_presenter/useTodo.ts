import { useEffect, useState } from 'react';
import { makeTodoService } from '../../application/TodoService';
import { TodoId, TodoPriority } from '../../infra/entities/todo_entity';
import { TodoVo } from '../../infra/entities/todo_vo';

const service = makeTodoService();

export function useTodo(): UseTodo {
  const [allTodos, setAllTodos] = useState<TodoVo[]>([]);

  function removeTodo(id: TodoId) {
    service.removeTodo(id);
  }

  function addTodo(message: string) {
    service.saveTodo({
      message,
      priority: TodoPriority.LOW,
    });
  }

  useEffect(() => {
    service.getAllTodos().then(setAllTodos);
  }, []);

  return {
    removeTodo,
    addTodo,
    allTodos,
  };
}

type UseTodo = {
  removeTodo: (id: TodoId) => void;
  addTodo: (message: string) => void;
  allTodos: TodoVo[];
};
