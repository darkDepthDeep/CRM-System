import { tokenService } from "./tokenService";

const BASE_URL = 'https://easydev.club/api/v1';

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshTokenFromCookies();

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
            tokenService.clearAccessToken();
            removeRefreshTokenFromCookies();
        }
        return null
    };

    const data = await response.json();
    tokenService.setAccessToken(data.accessToken);

    if (data.refreshToken) {
      setRefreshTokenInCookies(data.refreshToken);
    }

    return data.accessToken;
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error);
    return null;
  }
};

function getRefreshTokenFromCookies(): string | null {
  try {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'refreshToken') {
        return value;
      }
    }
    return null;
  } catch (error) {
    console.error('Ошибка получения Refresh Token', error);
    return null;
  }
}

function setRefreshTokenInCookies(token: string): void {
  try {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // 7 дней
    document.cookie = `refreshToken=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
  } catch (error) {
    console.error('Ошибка сохранения Refresh Token', error);
    throw new Error('Не удалось сохранить refresh токен');
  }
}

function removeRefreshTokenFromCookies(): void {
  try {
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  } catch (error) {
    console.error('Ошибка удаления Refresh Token', error);
  }
}