import { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";

import styles from "./TodoList.module.css";

export default function todoList({
  tasks,
  active,
  setError,
  error,
  getTasks,
  loading,
  validateTodoTitle,
}) {
  return (
    <ul className={`${styles["tabs-body"]} ${active ? styles["active"] : ""}`}>
      {loading ? (
        <p>Загрузка данных...</p>
      ) : error ? (
        <div className={styles["tabs-error"]}>{error.message}</div>
      ) : (
        tasks?.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            getTasks={getTasks}
            validateTodoTitle={validateTodoTitle}
          />
        ))
      )}
    </ul>
  );
}
