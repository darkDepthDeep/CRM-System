import axios from "axios";
import type {UpdateTask, TaskResponse, Task, Info, ParameterFilter} from "../types/types";

export const fetchTodoList = async (filter: ParameterFilter): Promise<TaskResponse<Task, Info>> => {
  try {
    const response = await axios.get(
      `https://easydev.club/api/v1/todos?filter=${filter}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Не удалось получить данные! Ошибка: ${error.response?.data}`);
    } else if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
}

export const addTask = async (data: string): Promise<TaskResponse<Task, Info>> => {
  try {

    const requestBody: {title: string, isDone: boolean} = {
      title: data,
      isDone: false
    };

    const response = await axios.post(
      "https://easydev.club/api/v1/todos", 
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
      }}
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Что то пошло не так попробуйте позже! Ошибка: ${error.response?.data}`);
    } else if (error instanceof Error) {
      console.error(error.message)
    }
    throw error;
  }
}


export const updateTask = async (id: number, data: UpdateTask): Promise<TaskResponse<Task, Info>>  => {
  try {

    const response = await axios.put(`https://easydev.club/api/v1/todos/${id}`, 
      data,
     {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Что то пошло не так, попробуйте позже! Ошибка: ${error.response?.data}`)
    } else if (error instanceof Error) {
      console.error(error.message)
    }
    throw error;
  }
}

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`https://easydev.club/api/v1/todos/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Что то пошло не так, попробуйте позже! Ошибка: ${error.response?.data}`)
    } else if (error instanceof Error) {
      console.error(error.message)
    }
    throw error;
  }
}
