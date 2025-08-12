import { useState } from "react";
import { fetchTodoList } from "../api/http.js";

import AddTask from "../components/AddTask/AddTask.jsx";
import Tabs from "../components/Tabs/Tabs.jsx";
import TodoList from "../components/TodoList/TodoList.jsx";

import styles from "./TodoListPage.module.css";

export default function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState("all");

  const getTasks = async () => {
    setError(null);

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

  const validateTodoTitle = (title) => {
    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      return "Это поле не может быть пустым!";
    }

    if (trimmedTitle.length < 2) {
      return "Минимальная длина текста 2 символа!";
    }

    if (trimmedTitle.length > 64) {
      return "Максимальная длина текста 64 символа!";
    }
  };

  return (
    <div className={styles["todo-list"]}>
      <AddTask getTasks={getTasks} validateTodoTitle={validateTodoTitle} />
      <Tabs
        error={error}
        counter={counter}
        active={active}
        setActive={setActive}
        getTasks={getTasks}
      />
      <TodoList
        tasks={tasks}
        active={active}
        setError={setError}
        getTasks={getTasks}
        loading={loading}
        error={error}
        validateTodoTitle={validateTodoTitle}
      />
    </div>
  );
}
