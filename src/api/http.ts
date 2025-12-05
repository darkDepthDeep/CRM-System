import { apiClient } from "../services/axiosConfig";
import type {
  UpdateTask,
  TaskResponse,
  Task,
  Info,
  ParameterFilter,
} from "../types/types";

export const fetchTodoList = async (
  filter: ParameterFilter
): Promise<TaskResponse<Task, Info>> => {
  const response = await apiClient.get(`/todos`, {
    params: {
      filter: filter,
    },
  });

  return response.data;
};

export const addTask = async (
  data: string
): Promise<TaskResponse<Task, Info>> => {
  const requestBody: { title: string; isDone: boolean } = {
    title: data,
    isDone: false,
  };

  const response = await apiClient.post("/todos", requestBody);

  return response.data;
};

export const updateTask = async (
  id: number,
  data: UpdateTask
): Promise<TaskResponse<Task, Info>> => {
  const response = await apiClient.put(`/todos/${id}`, data);

  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/todos/${id}`);
};
