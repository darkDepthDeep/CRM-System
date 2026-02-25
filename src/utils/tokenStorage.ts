export class TokenStorage {
  private readonly REFRESH_TOKEN_KEY = "refreshToken";

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  setRefreshToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  removeTokens(): void {
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}

export const tokenStorage = new TokenStorage();
