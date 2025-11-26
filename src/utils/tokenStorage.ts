export class TokenStorage {
  private accessToken: string | null = null;
  private readonly REFRESH_TOKEN_KEY = "refreshToken";

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
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
    this.accessToken = null;
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}

export const tokenStorage = new TokenStorage();
