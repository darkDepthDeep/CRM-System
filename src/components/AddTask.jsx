import { useState } from "react";
import { addTaskList, fetchTodoList } from "../api/http";

import styles from "./AddTask.module.css";

export default function AddTask({ setTasks, setCounter }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState();
  const [validateError, setValidateError] = useState();

  const handleAddTask = (newTasks) => {
    setTasks((prevTasks) => [...prevTasks, newTasks]);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (inputValue.length >= 1 && inputValue.length < 2) {
      setValidateError("Минимальная длина текста 2 символа!");
    } else if (inputValue.length > 64) {
      setValidateError("Максимальная длина текста 64 символа!");
    } else if (!inputValue.length || inputValue.trim() === "") {
      setValidateError("Это поле не может быть пустым!");
      setInputValue("");
    } else {
      setValidateError();
      try {
        const newTasks = await addTaskList(inputValue);
        const data = await fetchTodoList("all");

        handleAddTask(newTasks);
        setCounter(data.info);
        setInputValue("");
      } catch (error) {
        setError({
          message: error.message || "Что то пошло не так, попробуйте позже.",
        });
      }
    }
  };

  return error ? (
    <div className={styles["tabs-error"]}>{error.message}</div>
  ) : (
    <form action="#" className={styles["add-tasks"]} onSubmit={handleClick}>
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
