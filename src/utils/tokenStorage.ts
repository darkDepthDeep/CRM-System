export class TokenStorage {
  private readonly ACCESS_TOKEN_KEY = "accessToken";
  private readonly REFRESH_TOKEN_KEY = "refreshToken";

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setAccessToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    }
  }

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
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}

export const tokenStorage = new TokenStorage();
