import axios from "axios";
import { tokenStorage } from "../utils/tokenStorage";
import { authApi } from "../api/authApi";

let currentAccessToken: string | null = null;

export const getAccessTokenFromMemory = () => currentAccessToken;
export const setAccessTokenInMemory = (token: string | null) => {
  currentAccessToken = token;
};

export const refreshAuthSession = async (): Promise<string | null> => {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) {
    setAccessTokenInMemory(null);
    return null;
  }

  try {
    const tokens = await authApi.refreshTokens(refreshToken);
    setAccessTokenInMemory(tokens.accessToken);
    if (tokens.refreshToken) {
      tokenStorage.setRefreshToken(tokens.refreshToken);
    }
    return tokens.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      tokenStorage.removeTokens();
    } else {
      console.error("Ошибка при обновлении сессии:", error);
    }
    setAccessTokenInMemory(null);
    return null;
  }
};
