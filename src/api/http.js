export async function fetchTodoList(filter) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${filter}`
    );
    const resData = await response.json();

    return resData;
  } catch (error) {
    throw error;
  }
}

export async function addTask(data) {
  try {
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
  } catch (error) {
    throw error;
  }
}

export async function updateTask(id, data) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw error;
  }
}
