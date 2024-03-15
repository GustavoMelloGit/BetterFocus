import { useTodo } from '../presenters/todo_presenter/useTodo';

export default function TodoList(): JSX.Element {
  const { addTodo, removeTodo, allTodos } = useTodo();
  return (
    <div>
      <button onClick={() => addTodo('hello')}>Add Todo</button>
      <ul>
        {allTodos.map((todo) => (
          <li key={todo.id}>
            {todo.message}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
