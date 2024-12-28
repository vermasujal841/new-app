import { useState, useEffect } from 'react';
import './App.css';
import CreateTodo from './components/CreateTodo';
import Todos from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  // Fetch todos from the server
  const fetchTodos = () => {
    fetch("http://localhost:3000/todos")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data.todos);
      })
      .catch((err) => {
        console.error('Failed to fetch:', err);
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos when the component mounts
  }, []);

  return (
    <>
      <div>
        <CreateTodo onTodoAdded={fetchTodos} />
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <Todos todos={todos} />
        )}
      </div>
    </>
  );
}

export default App;
