import TodoItem from "../TodoItem/TodoItem";

import type { TodoListProps } from "../../types/types";

import styles from "./TodoList.module.css";

 const TodoList: React.FC<TodoListProps> = ({
  tasks,
  active,
  getTasks,
  loading,
  validateTodoTitle,
}) => {
  return (
    <ul className={`${styles["tabs-body"]} ${active ? styles["active"] : ""}`}>
      {loading ? (
        <p>Загрузка данных...</p>
      ) : (
        tasks?.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            getTasks={getTasks}
            validateTodoTitle={validateTodoTitle}
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;