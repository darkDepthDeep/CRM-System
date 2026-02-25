import { apiClient } from "../services/axiosConfig";
import type { Token } from "../types/auth";

export const authApi = {
  refreshTokens: async (refreshToken: string): Promise<Token> => {
    const response = await apiClient.post<Token>("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },
};
