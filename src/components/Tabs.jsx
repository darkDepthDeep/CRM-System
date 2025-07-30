import { useState, useEffect } from "react";
import { fetchTodoList } from "../api/http.js";
import EditingTask from "./EditingTask.jsx";
import TaskEditor from "./TaskEditor.jsx";

import styles from "./Tabs.module.css";

export default function Tabs({ tasks, setTasks, counter, setCounter }) {
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const resData = await fetchTodoList(active);

        setCounter(resData.info);
        setTasks(resData.data);

        setLoading(false);
      } catch (error) {
        setError({
          message: error.message || "Не удалось получить данные.",
        });
        setLoading(false);
      }
    }

    fetchData();
  }, [setTasks, active]);

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

      <ul
        className={`${styles["tabs-body"]} ${active ? styles["active"] : ""}`}
      >
        {loading ? (
          <p>Загрузка данных...</p>
        ) : (
          tasks?.map((item) => (
            <li key={item.id} className={styles["tabs-body__list"]}>
              <div className={styles["tabs-body__wrap-input"]}>
                <TaskEditor
                  item={item}
                  tasks={tasks}
                  setTasks={setTasks}
                  active={active}
                  setCounter={setCounter}
                />
                <EditingTask
                  item={item}
                  tasks={tasks}
                  setTasks={setTasks}
                  setError={setError}
                  setCounter={setCounter}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
