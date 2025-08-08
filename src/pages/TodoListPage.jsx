import { useState } from "react";
import { fetchTodoList } from "../api/http.js";

import AddTaskTitle from "../components/AddTaskTitle/AddTaskTitle.jsx";
import Tabs from "../components/Tabs/Tabs.jsx";

import styles from "./TodoListPage.module.css";

export default function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [active, setActive] = useState("all");

  const getTasks = async () => {
    try {
      const data = await fetchTodoList(active);
      setTasks(data.data);
      setCounter(data.info);
      setLoading(false);
    } catch (error) {
      setError({
        message: "Не удалось получить данные.",
      });
      setLoading(false);
    }
  };

  return (
    <div className={styles["todo-list"]}>
      <AddTaskTitle getTasks={getTasks} active={active} error={error} />
      <Tabs
        error={error}
        setError={setError}
        tasks={tasks}
        setTasks={setTasks}
        counter={counter}
        setCounter={setCounter}
        active={active}
        setActive={setActive}
        getTasks={getTasks}
        loading={loading}
      />
    </div>
  );
}
