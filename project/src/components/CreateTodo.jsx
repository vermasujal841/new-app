import React, { useState } from 'react';

const CreateTodo = ({ onTodoAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleAddTodo = () => {
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to add todo");
        }
        await res.json();
        setTitle(""); // Reset title
        setDescription(""); // Reset description
        setError(null); // Clear error
        onTodoAdded(); // Notify App to refresh the todos
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Failed to add todo. Please try again.");
      });
  };

  return (
    <div>
      <input
        style={{ padding: 5, margin: 10 }}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        style={{ padding: 5, margin: 10 }}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button
        style={{ padding: 10, margin: 10 }}
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateTodo;
