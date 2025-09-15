import React, { useState } from "react";
import { addTask } from "../../api/http";

import type { AddTaskProps } from "../../types/types";

import styles from "./AddTask.module.css";

  const AddTask: React.FC<AddTaskProps> = ({ getTasks, validateTodoTitle }) => {
  const [title, setTitle] = useState<string>("");
  const [validateError, setValidateError] = useState<string>("");
  const [error, setError] = useState<{message: string} | null>(null);

  const handleSubmitTodo = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)

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
        onChange={handleValueChange}
      />
      <button className={styles["add-task__btn"]}>Add</button>
      {validateError && (
        <p className={styles["validate-error"]}>{validateError}</p>
      )}
    </form>
  );
}

export default AddTask;