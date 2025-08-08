import { act, useState } from "react";
import { addTask, fetchTodoList } from "../../api/http";

import styles from "./AddTaskTitle.module.css";

export default function AddTaskTitle({ getTasks }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState();
  const [validateError, setValidateError] = useState();

  const handleSubmitTodo = async (e) => {
    e.preventDefault();

    const trimmedTitle = inputValue.trim();

    if (trimmedTitle === "") {
      setValidateError("Это поле не может быть пустым!");
      setInputValue("");
      return;
    }

    if (trimmedTitle.length < 2) {
      setValidateError("Минимальная длина текста 2 символа!");
      setInputValue("");
      return;
    }

    if (trimmedTitle.length > 64) {
      setValidateError("Максимальная длина текста 64 символа!");
      return;
    }

    setValidateError();

    try {
      await addTask(trimmedTitle);
      getTasks();
      setInputValue("");
    } catch (error) {
      setError({
        message: "Что то пошло не так, попробуйте позже.",
      });
    }
  };

  return error ? (
    <div className={styles["tabs-error"]}>{error.message}</div>
  ) : (
    <form
      action="#"
      className={styles["add-tasks"]}
      onSubmit={handleSubmitTodo}
    >
      <input
        type="text"
        className={styles["add-task__input"]}
        placeholder="Task To Be Done..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input type="submit" value="Add" className={styles["add-task__btn"]} />
      {validateError && (
        <p className={styles["validate-error"]}>{validateError}</p>
      )}
    </form>
  );
}
