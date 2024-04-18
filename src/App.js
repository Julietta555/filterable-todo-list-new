import React, { useState, useMemo, useCallback } from "react";
import Todo from "./Todo";
import Conditions from "./Conditions";
import InputData from "./inputData";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  const handleSetName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleAddTodo = useCallback(() => {
    if (name.trim() === "") {
      return;
    }
    const todo = {
      id: Math.floor(Math.random() * 100000),
      name: name,
      done: false,
      createdAt: new Date().toLocaleDateString(),
      createdTime: new Date().toLocaleTimeString()
    };

    setName("");
    setTodos((prevTodos) => [...prevTodos, todo]);
  }, [name]);

  const handleSetDone = useCallback((done, id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, done } : todo))
    );
  }, []);

  const handleRemoveTodo = useCallback((name) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.name !== name));
  }, []);

  const handleToggleIncompleteOnly = useCallback(() => {
    setShowIncompleteOnly((prevState) => !prevState);
  }, []);

  const handleSortOptionChange = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (showIncompleteOnly) {
        return !todo.done;
      }
      return true;
    });
  }, [todos, showIncompleteOnly]);

  const sortedTodos = useMemo(() => {
    return [...filteredTodos].sort((a, b) => {
      const dateA = new Date(`${a.createdAt} ${a.createdTime}`);
      const dateB = new Date(`${b.createdAt} ${b.createdTime}`);

      if (sortOption === "newest") {
        return dateB - dateA;
      } else if (sortOption === "oldest") {
        return dateA - dateB;
      } else if (sortOption === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [filteredTodos, sortOption]);

  if (sortOption === "newest") {
    sortedTodos.reverse();
  }

  return (
    <div>
      <h1>TO DO</h1>
      <InputData
        name={name}
        handleSetName={handleSetName}
        handleAddTodo={handleAddTodo}
      />
      <Conditions
        showIncompleteOnly={showIncompleteOnly}
        sortOption={sortOption}
        handleToggleIncompleteOnly={handleToggleIncompleteOnly}
        handleSortOptionChange={handleSortOptionChange}
      />
      {sortedTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          name={todo.name}
          done={todo.done}
          createdAt={todo.createdAt}
          createdTime={todo.createdTime}
          onDone={(done) => handleSetDone(done, todo.id)}
          onRemove={handleRemoveTodo}
        />
      ))}
    </div>
  );
}
