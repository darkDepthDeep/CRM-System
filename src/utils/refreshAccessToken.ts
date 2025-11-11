import { tokenStorage } from "./tokenStorage";

const BASE_URL = 'https://easydev.club/api/v1';

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
        console.log("Нет рефреш токена");
        return null;
    }

    try {
        console.log("Отправляю запрос на обновление токена...");
        const response = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({refreshToken})
        });
        
        console.log("Ответ от сервера", response.status, response.statusText);

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Сервер вернул ошибку:', errorText);
        if (response.status === 401 || response.status === 400) {
            tokenStorage.removeTokens();
        }
        return null
    };

    const data = await response.json();
    tokenStorage.setAccessToken(data.accessToken);

    if (data.refreshToken) {
      tokenStorage.setRefreshToken(data.refreshToken);
    }

    return data.accessToken;
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error);
    return null;
  }
};
