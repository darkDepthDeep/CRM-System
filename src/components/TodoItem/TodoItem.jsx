import { useState } from "react";
import { updateTask, deleteTask, fetchTodoList } from "../../api/http";

import styles from "./TodoItem.module.css";

export default function TodoItem({
  item,
  tasks,
  setTasks,
  setCounter,
  setError,
  getTasks,
}) {
  const [idTask, setIdTask] = useState();
  const [originalTitle, setOriginalTitle] = useState({});
  const [validateError, setValidateError] = useState();

  const handleChange = async (item) => {
    try {
      await updateTask(item.id, {
        title: item.title,
        isDone: !item.isDone,
      });

      getTasks();
    } catch (error) {
      console.error(error);
      setError({
        message: "Что то пошло не так, попробуйте позже.",
      });
    }
  };

  const updateTaskTitle = (id, text) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title: text } : task))
    );
  };

  const handleStartEdit = (item) => {
    setOriginalTitle((prev) => ({ ...prev, [item.id]: item.title }));
    setIdTask(item.id);
    setValidateError();
  };

  const handleCancelEdit = (id) => {
    updateTaskTitle(id, originalTitle[id]);
    setIdTask();
    setValidateError();
  };

  const handleSaveEdit = async (id, newValue, isDone) => {
    setValidateError();

    if (!newValue || newValue.trim() === "") {
      updateTaskTitle(id, "");
      setValidateError("Это поле не может быть пустым!");
      return;
    } else if (newValue.length < 2) {
      updateTaskTitle(id, "");
      setValidateError("Минимальная длина текста 2 символа!");
      return;
    } else if (newValue.length > 64) {
      updateTaskTitle(id, "");
      setValidateError("Максимальная длина текста 64 символа!");
      return;
    }

    try {
      const updatedTask = await updateTask(id, {
        title: newValue,
        isDone: isDone,
      });

      updateTaskTitle(id, updatedTask.title);
      getTasks();
      setIdTask();
      setValidateError();
    } catch (error) {
      console.error(error);
      setError({
        message: "Что то пошло не так, попробуйте позже.",
      });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      const data = await fetchTodoList("all");
      setTasks(tasks.filter((task) => task.id !== id));
      setCounter(data.info);
    } catch (error) {
      console.error(error);
      setError({
        message: "Что то пошло не так, попробуйте позже.",
      });
    }
  };

  return (
    <li className={styles["tabs-body__list"]}>
      <div className={styles["tabs-body__wrap-input"]}>
        <input
          className={styles["tabs-body__input-checkbox"]}
          id={item.id}
          type="checkbox"
          checked={item.isDone}
          onChange={() => handleChange(item)}
        />
        {idTask === item.id ? (
          <>
            <input
              id={`edit-${item.id}`}
              type="text"
              className={`${styles["tabs-body__input-text"]} ${
                validateError ? styles["input-error"] : ""
              }`}
              value={item.title}
              onChange={(e) => {
                updateTaskTitle(item.id, e.target.value);
                if (validateError) setValidateError();
              }}
              placeholder={validateError || "Введите текст"}
              style={{
                display: "block",
                borderColor: validateError ? "red" : "rgb(219,222,227)",
              }}
            />
            <label
              className={styles["tabs-body__label"]}
              htmlFor={item.id}
              style={{ display: "none" }}
            ></label>
            <div
              className={`${styles["tabs-body__wrap-btn"]} ${styles["tabs-body__wrap-btn--indent"]}`}
            >
              <button
                className={styles["tabs-body__edit"]}
                onClick={() => handleSaveEdit(item.id, item.title, item.isDone)}
              >
                <img src="./images/saved.png" alt="Сохранить" />
              </button>
              <button
                className={styles["tabs-body__delete"]}
                onClick={() => handleCancelEdit(item.id)}
              >
                <img src="./images/cancel.png" alt="Удалить" />
              </button>
            </div>
          </>
        ) : (
          <>
            <label
              className={styles["tabs-body__label"]}
              htmlFor={item.id}
              style={{ display: "block" }}
            ></label>
            <span
              className={styles["tabs-body__text"]}
              style={{
                textDecoration: item.isDone ? "line-through" : "none",
                color: item.isDone ? "rgb(164,164,166)" : "unset",
              }}
            >
              {item.title}
            </span>
            <div className={styles["tabs-body__wrap-btn"]}>
              <button
                className={styles["tabs-body__edit"]}
                onClick={() => handleStartEdit(item)}
              >
                <img src="./images/compose.png" alt="edit" />
              </button>
              <button onClick={() => handleDeleteTask(item.id)}>
                <img src="./images/bin.png" alt="delete" />
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
