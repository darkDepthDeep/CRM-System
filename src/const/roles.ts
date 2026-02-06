import type { Role } from "../types/auth";

export const ROLE_COLORS: Record<Role, string> = {
  ADMIN: "red",
  MODERATOR: "gold",
  USER: "blue",
};

export const getRoleColor = (role: Role): string => {
  return ROLE_COLORS[role] || "default";
};
