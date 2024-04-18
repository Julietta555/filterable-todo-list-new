import React from "react";

export default function InputData({ name, handleSetName, handleAddTodo }) {
  return (
    <div className="inputData">
      <input className="input" value={name} onChange={handleSetName} />
      <button className="add-button" onClick={handleAddTodo}>
        Add new todo
      </button>
    </div>
  );
}
