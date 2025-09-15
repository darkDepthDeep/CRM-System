import type {UpdateTask, TaskResponse, Task, Info, ParameterFilter} from "../types/types";

export const fetchTodoList = async (filter: ParameterFilter): Promise<TaskResponse<Task, Info>> => {
  try {
    const response: Response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${filter}`
    );
    const resData: TaskResponse<Task, Info> = await response.json();

    return resData;
  } catch (error) {
    console.error(`Не удалось получить данные! Ошибка: ${error}`);
    throw error;
  }
}

export  const addTask = async (data: string): Promise<TaskResponse<Task, Info>> => {
  try {

    const requestBody: {title: string, isDone: boolean} = {
      title: data,
      isDone: false
    };

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      }
    }

    const response: Response = await fetch("https://easydev.club/api/v1/todos", fetchOptions);

    const resData: TaskResponse<Task, Info> = await response.json();

    return resData;
  } catch (error) {
    console.error(`Что то пошло не так попробуйте позже! Ошибка: ${error}`);
    throw error;
  }
}


export const updateTask = async (id: number, data: UpdateTask): Promise<TaskResponse<Task, Info>>  => {
  try {

    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: TaskResponse<Task, Info> = await response.json();

    return result;
  } catch (error) {
    console.error(`Что то пошло не так, попробуйте позже! Ошибка: ${error}`)
    throw error;
  }
}

export  const deleteTask = async (id: number): Promise<void> => {
  try {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Что то пошло не так, попробуйте позже! Ошибка: ${error}`)
    throw error;
  }
}
