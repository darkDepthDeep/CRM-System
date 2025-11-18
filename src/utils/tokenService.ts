let accessToken: string | null = null;

const storedToken = localStorage.getItem('accessToken');
if (storedToken) {
    accessToken = storedToken;
}

export const tokenService = {
    getAccessToken(): string | null {
        return accessToken
    },

    setAccessToken(token: string | null): void {
        accessToken = token;
        if (token) {
            localStorage.setItem('accessToken', token);
        } else {
            localStorage.removeItem('accessToken');
        }
    },

    clearAccessToken(): void {
        this.setAccessToken(null);
    }
}

