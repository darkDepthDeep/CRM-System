import { useState } from "react";
import { updateTask, deleteTask } from "../../api/http";

import styles from "./TodoItem.module.css";

export default function TodoItem({ item, getTasks, validateTodoTitle }) {
  const [editTitle, setEditTitle] = useState("");
  const [validateError, setValidateError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async () => {
    setError(null);

    try {
      await updateTask(item.id, {
        title: item.title,
        isDone: !item.isDone,
      });

      await getTasks();
    } catch (error) {
      console.error(error);
      setError({
        message: "Что то пошло не так, попробуйте позже.",
      });
    }
  };

  const handleStartEdit = () => {
    setEditTitle(item.title);
    setIsEditMode(true);
    setValidateError("");
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setValidateError("");
  };

  const handleSaveEdit = async () => {
    setError(null);
    setValidateError("");

    const error = validateTodoTitle(editTitle);
    if (error) {
      setValidateError(error);
      return;
    }

    try {
      await updateTask(item.id, {
        title: editTitle,
        isDone: item.isDone,
      });

      await getTasks();
      setIsEditMode(false);
      setValidateError("");
    } catch (error) {
      console.error(error);
      setError({
        message: "Что то пошло не так, попробуйте позже.",
      });
    }
  };

  const handleDeleteTask = async () => {
    setError(null);

    try {
      await deleteTask(item.id);
      await getTasks();
    } catch (error) {
      console.error(error);
      setError({
        message: "Что то пошло не так, попробуйте позже.",
      });
    }
  };

  return error ? (
    <div className={styles["tabs-error"]}>{error.message}</div>
  ) : (
    <li className={styles["tabs-body__list"]}>
      <div className={styles["tabs-body__wrap-input"]}>
        <input
          className={styles["tabs-body__input-checkbox"]}
          id={item.id}
          type="checkbox"
          checked={item.isDone}
          onChange={handleChange}
        />
        {isEditMode ? (
          <>
            <input
              id={`edit-${item.id}`}
              type="text"
              className={`${styles["tabs-body__input-text"]}`}
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                if (validateError) setValidateError("");
              }}
              placeholder={"Введите текст"}
              style={{
                display: "block",
                borderColor: validateError ? "red" : "rgb(219,222,227)",
              }}
            />
            {validateError && (
              <div className={styles["validate-error"]}>{validateError}</div>
            )}
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
                onClick={handleSaveEdit}
              >
                <img src="./images/saved.png" alt="Сохранить" />
              </button>
              <button
                className={styles["tabs-body__delete"]}
                onClick={handleCancelEdit}
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
                onClick={handleStartEdit}
              >
                <img src="./images/compose.png" alt="edit" />
              </button>
              <button onClick={handleDeleteTask}>
                <img src="./images/bin.png" alt="delete" />
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
