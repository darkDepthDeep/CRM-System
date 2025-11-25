const BASE_URL = 'https://easydev.club/api/v1';

export const authApi = {
    refreshTokens: async (refreshToken: string) => {
        const response = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Обновление не удалось: ${response.status} ${errorText}`)
        }

        return response.json();
    },
};