import { useState, useEffect, useCallback } from "react";
import { fetchTodoList } from "../api/http.ts";

import {Space, message} from 'antd'

import type { Task, Info, ParameterFilter } from "../types/types.ts";

import AddTask from "../components/AddTask/AddTask.tsx";
import Tabs from "../components/Tabs/Tabs.tsx";
import TodoList from "../components/TodoList/TodoList.tsx";

import styles from "./TodoListPage.module.css";

  const TodoListPage: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [counter, setCounter] = useState<Info | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [active, setActive] = useState<ParameterFilter>("all");
  const [showMessage, messagePlace] = message.useMessage();

  const getTasks = useCallback (async (): Promise<void> => {

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
      showMessage.error("Не удалось получить данные.")

      setLoading(false);
    }
  }, [active]);

  useEffect(() => {
    getTasks();
    const interval = setInterval(getTasks, 5000);
    return () => clearInterval(interval)
  }, [getTasks]);

  return (
    <Space.Compact className={styles["todo-list"]} style={{display: "block"}}>
      {messagePlace}
      <AddTask getTasks={getTasks} />
      <Tabs
        counter={counter}
        active={active}
        setActive={setActive}
      />
      <TodoList
        tasks={tasks}
        active={active}
        getTasks={getTasks}
        loading={loading}
      />
    </Space.Compact>
  );
}


export default TodoListPage;