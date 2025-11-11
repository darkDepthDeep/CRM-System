import type { UserRegistration } from "../types/auth";
import { apiClient } from "../services/axiosConfig";
import axios from "axios";

export const RegistrNewUser = async (email: string, login: string, password: string, phoneNumber: string, username: string): Promise<void> => {
  try {
    const requestBody: UserRegistration = {
      email: email,
      login: login,
      password: password,
      phoneNumber: phoneNumber,
      username: username,
    }

     await apiClient.post("/auth/signup", requestBody)

  } catch (error) {
    if (axios.isAxiosError(error)) {

      if (error.response?.status === 409) {
        throw new Error('Пользователь с такими данными уже существует. Попробуйте другой email или логин.');
      } else {
        throw new Error(`Что то пошло не так попробуйте позже! Ошибка: ${error.response?.data}`);
      }
    } else if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw error;
  }
}