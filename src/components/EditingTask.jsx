import { useState } from "react";
import { updateTask } from "../api/http";
import DeleteTask from "./DeleteTask";
import styles from "./EditingTask.module.css";

export default function EditingTask({
  item,
  tasks,
  setTasks,
  setError,
  setCounter,
}) {
  const [idTask, setIdTask] = useState();
  const [originalTitle, setOriginalTitle] = useState({});
  const [validateError, setValidateError] = useState();

  const updateTaskTitle = (id, text) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title: text } : task))
    );
  };

  const handleSaveEdit = async (id, newValue) => {
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
        isDone: item.isDone,
      });

      updateTaskTitle(id, updatedTask.title);
      setIdTask();
      setValidateError();
    } catch (error) {
      setError({
        message: error.message || "Что то пошло не так, попробуйте позже.",
      });
    }
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

  return (
    <>
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
              onClick={() => handleSaveEdit(item.id, item.title)}
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
            <DeleteTask
              tasks={tasks}
              setTasks={setTasks}
              item={item}
              setCounter={setCounter}
            />
          </div>
        </>
      )}
    </>
  );
}
