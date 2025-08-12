import { act, useState } from "react";
import { addTask, fetchTodoList } from "../../api/http";

import styles from "./AddTask.module.css";

export default function AddTask({ getTasks, validateTodoTitle }) {
  const [title, setTitle] = useState("");
  const [validateError, setValidateError] = useState("");
  const [error, setError] = useState("");

  const handleSubmitTodo = async (e) => {
    e.preventDefault();

    const error = validateTodoTitle(title);
    if (error) {
      setValidateError(error);
      return;
    }

    setValidateError("");

    try {
      await addTask(title.trim());
      await getTasks();
      setTitle("");
    } catch (error) {
      console.log(error);
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className={styles["add-task__btn"]}>Add</button>
      {validateError && (
        <p className={styles["validate-error"]}>{validateError}</p>
      )}
    </form>
  );
}
