import React, { useState, useMemo, useCallback } from "react";
import "./Todo.css";

export default function Todo(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCheck = useCallback(
    (e) => {
      const done = e.target.checked;
      props.onDone(done, props.name);
    },
    [props.onDone, props.name]
  );

  const handleDeleteOn = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleDeleteOff = useCallback(() => {
    setIsHovered(false);
  }, []);

  const { done, name, createdAt, createdTime } = props;

  const deleteButton = useMemo(() => {
    if (isHovered) {
      return (
        <button className="deleteButton" onClick={() => props.onRemove(name)}>
          Delete
        </button>
      );
    }
  }, [isHovered, props.onRemove, name]);

  return (
    <div
      id="todo"
      className={done ? "done" : ""}
      onMouseEnter={handleDeleteOn}
      onMouseLeave={handleDeleteOff}
    >
      <input type="checkbox" checked={done} onChange={handleCheck} />
      <span>{name}</span>
      <span>{createdAt}</span>
      <span>{createdTime}</span>
      {deleteButton}
    </div>
  );
}
