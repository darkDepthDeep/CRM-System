import { useState } from "react";
import { fetchTodoList } from "../api/http.ts";

import type { Task, Info, ParameterFilter } from "../types/types.ts";

import AddTask from "../components/AddTask/AddTask.tsx";
import Tabs from "../components/Tabs/Tabs.tsx";
import TodoList from "../components/TodoList/TodoList.tsx";

import styles from "./TodoListPage.module.css";

  const TodoListPage: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [counter, setCounter] = useState<Info | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{message: string} | null>(null);
  const [active, setActive] = useState<ParameterFilter>("all");

  const getTasks = async (): Promise<void> => {
    setError(null);

    try {
      const data = await fetchTodoList(active);
      setTasks(data.data);
      if(data.info) {
      setCounter(data.info);
      } else {
        setCounter(null)
      }
      setLoading(false);
    } catch (error) {

      console.error(error)
      setError({
        message: "Не удалось получить данные.",
      });
      setLoading(false);
    }
  };

  const validateTodoTitle = (title: string): string | null => {
    const trimmedTitle: string = title.trim();

    if (trimmedTitle === "") {
      return "Это поле не может быть пустым!";
    }

    if (trimmedTitle.length < 2) {
      return "Минимальная длина текста 2 символа!";
    }

    if (trimmedTitle.length > 64) {
      return "Максимальная длина текста 64 символа!";
    }

    return null;
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
        getTasks={getTasks}
        loading={loading}
        validateTodoTitle={validateTodoTitle}
      />
    </div>
  );
}


export default TodoListPage;