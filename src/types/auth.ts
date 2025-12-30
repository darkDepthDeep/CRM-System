export interface AuthData {
  login: string;
  password: string;
}

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}

export interface UpdateProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}

export interface PasswordRequest {
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}

export type Role = "ADMIN" | "USER" | "MODERATOR";
