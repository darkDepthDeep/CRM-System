import { useState, useEffect } from "react";
import { fetchTodoList } from "../../api/http.js";
import TodoList from "../TodoList/TodoList.jsx";

import styles from "./Tabs.module.css";

export default function Tabs({
  error,
  setError,
  tasks,
  setTasks,
  counter,
  setCounter,
  active,
  setActive,
  getTasks,
  loading,
}) {
  useEffect(() => {
    getTasks();
  }, [active]);

  const handleClickShow = (status) => {
    setActive(status);
  };

  return error ? (
    <div className={styles["tabs-error"]}>{error.message}</div>
  ) : (
    <>
      <div className={styles["tabs-header"]}>
        <button
          className={styles["tabs-header__btn"]}
          onClick={() => handleClickShow("all")}
          style={{ color: active === "all" ? "#1da7d8" : "#95969a" }}
        >
          Все({counter?.all || "0"})
        </button>
        <button
          className={styles["tabs-header__btn"]}
          onClick={() => handleClickShow("inWork")}
          style={{ color: active === "inWork" ? "#1da7d8" : "#95969a" }}
        >
          в работе({counter?.inWork || "0"})
        </button>
        <button
          className={styles["tabs-header__btn"]}
          onClick={() => handleClickShow("completed")}
          style={{ color: active === "completed" ? "#1da7d8" : "#95969a" }}
        >
          сделано({counter?.completed || "0"})
        </button>
      </div>

      <TodoList
        tasks={tasks}
        setTasks={setTasks}
        active={active}
        setCounter={setCounter}
        setError={setError}
        getTasks={getTasks}
        loading={loading}
        error={error}
      />
    </>
  );
}
