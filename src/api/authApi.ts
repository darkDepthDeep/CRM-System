import axios from "axios";
import { apiClient } from "../services/axiosConfig";
import type { Token } from "../types/auth";

export const authApi = {
  refreshTokens: async (refreshToken: string): Promise<Token> => {
    try {
      const response = await apiClient.post<Token>("/auth/refresh", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Ошибка обновления токена";
        console.error(`Не удалось обновить токен! Ошибка: ${message}`);
        throw error;
      } else if (error instanceof Error) {
        console.error(error.message);
        throw error;
      } else {
        console.error("Неизвестная ошибка при обновлении токена");
        throw new Error("Неизвестная ошибка");
      }
    }
  },
};
