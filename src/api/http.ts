import { apiClient } from "../services/axiosConfig";
import type {
  UpdateTask,
  TaskResponse,
  Task,
  Info,
  ParameterFilter,
} from "../types/types";

export const fetchTodoList = async (
  filter: ParameterFilter,
): Promise<TaskResponse<Task, Info>> => {
  const response = await apiClient.get<TaskResponse<Task, Info>>(`/todos`, {
    params: {
      filter: filter,
    },
  });

  return response.data;
};

export const addTask = async (
  title: string,
): Promise<TaskResponse<Task, Info>> => {
  const requestBody: { title: string; isDone: boolean } = {
    title,
    isDone: false,
  };

  const response = await apiClient.post<TaskResponse<Task, Info>>(
    "/todos",
    requestBody,
  );

  return response.data;
};

export const updateTask = async (
  id: number,
  data: UpdateTask,
): Promise<TaskResponse<Task, Info>> => {
  const response = await apiClient.put<TaskResponse<Task, Info>>(
    `/todos/${id}`,
    data,
  );

  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/todos/${id}`);
};
