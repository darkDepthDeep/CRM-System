import { updateTask, fetchTodoList } from "../api/http";
import styles from "./Tabs.module.css";

export default function TaskEditor({
  item,
  tasks,
  setTasks,
  setCounter,
  active,
}) {
  const handleChange = async () => {
    try {
      await updateTask(item.id, {
        title: item.title,
        isDone: !item.isDone,
      });

      const data = await fetchTodoList(active);
      setTasks(data.data);
      setCounter(data.info);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <input
      className={styles["tabs-body__input-checkbox"]}
      id={item.id}
      type="checkbox"
      checked={item.isDone}
      onChange={handleChange}
    />
  );
}
