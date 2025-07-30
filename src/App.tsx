import React, { useState } from "react";
import "./App.css"; // vamos criar esse CSS já já

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  function showMessage(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000); // some após 2 segundos
  }

  function addTodo() {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      done: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
    showMessage("✅ Tarefa adicionada!");
  }

  function toggleDone(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function removeTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
    showMessage("❌ Tarefa removida!");
  }

  return (
    <div className="container">
      <h1>📝 ToDo List</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Digite uma tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      {message && <div className="message">{message}</div>}

      <ul className="todo-list">
        {todos.length === 0 && <li className="empty">Nenhuma tarefa ainda!</li>}
        {todos.map(({ id, text, done }) => (
          <li key={id} className={done ? "done" : ""}>
            <span onClick={() => toggleDone(id)}>{text}</span>
            <button className="remove" onClick={() => removeTodo(id)}>
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
