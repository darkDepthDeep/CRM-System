import { deleteTask, fetchTodoList } from "../api/http";

export default function DeleteTask({ tasks, setTasks, item, setCounter }) {
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      const data = await fetchTodoList("all");
      setTasks(tasks.filter((task) => task.id !== id));
      setCounter(data.info);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button onClick={() => handleDeleteTask(item.id)}>
      <img src="./images/bin.png" alt="delete" />
    </button>
  );
}
