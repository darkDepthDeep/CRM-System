import { useState } from "react";
import AddTask from "../components/AddTask.jsx";
import Tabs from "../components/Tabs.jsx";

import styles from "./TodoListPage.module.css";

export default function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState();

  return (
    <div className={styles["todo-list"]}>
      <AddTask setTasks={setTasks} setCounter={setCounter} />
      <Tabs
        tasks={tasks}
        setTasks={setTasks}
        counter={counter}
        setCounter={setCounter}
      />
    </div>
  );
}
