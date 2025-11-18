export const tokenStorage = {

    setRefreshToken: (token:string): void => {
        try {
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            document.cookie = `refreshToken=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
            console.log('refresh токен сохранен в куки');
        } catch (error) {
            console.error('Ошибка сохранения Refresh Token', error)
            throw new Error('Не удалось сохранить refresh токен')
        }
    },

    getRefreshToken: (): string | null => {
        try {
            const cookies = document.cookie.split(';')
            for (const cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'refreshToken') { 
                    return value
                }
            }
            return null;
        }catch (error) {
            console.error('Ошибка получения Refresh Token', error);
            return null;
        }
    },

    removeRefreshToken(): void {
        try {
            document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } catch (error) {
            console.error('Ошибка удаления Refresh Token', error);
        }
    }
}

