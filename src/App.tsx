import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { useTodo } from './domain/todo/hooks/useTodo';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);
  const { availableTodos, deletedTodos, addTodo, removeTodo } = useTodo();

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button onClick={() => addTodo('hello')}>Add Todo</button>
      <ul>
        {availableTodos.map((todo) => (
          <li key={todo.id}>
            {todo.message}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Deleted Todos</h2>
      <ul>
        {deletedTodos.map((todo) => (
          <li key={todo.id}>{todo.message}</li>
        ))}
      </ul>

      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
