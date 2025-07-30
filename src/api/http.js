export async function fetchTodoList(filter) {
  const response = await fetch(
    `https://easydev.club/api/v1/todos?filter=${filter}`
  );
  const resData = await response.json();

  return resData;
}

export async function addTaskList(data) {
  const response = await fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    body: JSON.stringify({
      title: data,
      isDone: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  return resData;
}

export async function updateTask(id, data) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function deleteTask(id) {
  await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "DELETE",
  });
}
