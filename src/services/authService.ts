import axios from "axios";
import { tokenStorage } from "../utils/tokenStorage";
import { authApi } from "../api/authApi";

export const refreshAuthSession = async (): Promise<string | null> => {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const tokens = await authApi.refreshTokens(refreshToken);
    tokenStorage.setAccessToken(tokens.accessToken);
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
    return null;
  }
};
