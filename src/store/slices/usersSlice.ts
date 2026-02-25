import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../services/axiosConfig";
import type { Profile, MetaResponse, Role } from "../../types/auth";
import axios from "axios";

interface UsersState {
  data: Profile[];
  selectedUser: Profile | null;
  loading: boolean;
  loadingSelected: boolean;
  error: string | null;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const initialState: UsersState = {
  data: [],
  selectedUser: null,
  loading: false,
  loadingSelected: false,
  error: null,
  pagination: {
    current: 1,
    pageSize: 5,
    total: 0,
    totalPages: 1,
  },
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    {
      page = 1,
      limit = 5,
      search,
      sortBy,
      sortOrder,
      isBlocked,
    }: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
      isBlocked?: boolean;
    },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      if (search) {
        params.set("search", search);
      }

      if (sortBy) {
        params.set("sortBy", sortBy);
      }

      if (sortOrder) {
        params.set("sortOrder", sortOrder);
      }

      if (isBlocked !== undefined) {
        params.set("isBlocked", isBlocked.toString());
      }

      const response = await apiClient.get<MetaResponse<Profile>>(
        `/admin/users?${params.toString()}`,
      );

      return {
        users: response.data.data,
        totalAmount: response.data.meta.totalAmount,
        page,
        limit,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Не удалось загрузить список пользователей";
        return rejectWithValue(message);
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка при загрузке пользователей");
    }
  },
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<Profile>(`/admin/users/${userId}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Не удалось загрузить данные пользователя";
        return rejectWithValue(message);
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    { id, data }: { id: string; data: Partial<Profile> },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiClient.put<Profile>(`/admin/users/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Не удалось обновить данные";
        return rejectWithValue(message);
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка при обновлении");
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      await apiClient.delete<void>(`/admin/users/${userId}`);
      return userId;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Не удалось удалить пользователя";
        return rejectWithValue(String(message));
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  },
);

export const blockUser = createAsyncThunk(
  "users/blockUser",
  async (userId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiClient.post<Profile>(
        `/admin/users/${userId}/block`,
      );
      await dispatch(fetchUsers({}));
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Не удалось заблокировать пользователя",
        );
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  },
);

export const unblockUser = createAsyncThunk(
  "users/unblockUser",
  async (userId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiClient.post<Profile>(
        `/admin/users/${userId}/unblock`,
      );
      await dispatch(fetchUsers({}));
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Не удалось разблокировать пользователя",
        );
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  },
);

export const updateUserRoles = createAsyncThunk(
  "users/updateUserRoles",
  async (
    { id, roles }: { id: string; roles: Role[] },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await apiClient.post<Profile>(
        `/admin/users/${id}/rights`,
        { roles },
      );
      await dispatch(fetchUsers({}));
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Не удалось обновить роли",
        );
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const { users, totalAmount, page, limit } = action.payload;
        state.loading = false;
        state.data = users;
        state.pagination = {
          current: page,
          pageSize: limit,
          total: totalAmount,
          totalPages: Math.ceil(totalAmount / limit),
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loadingSelected = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loadingSelected = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loadingSelected = false;
        state.error = action.payload as string;
        state.selectedUser = null;
      });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updated = action.payload;
      state.selectedUser = updated;
      const index = state.data.findIndex((u) => u.id === updated.id);
      if (index !== -1) {
        state.data[index] = updated;
      }
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const userId = Number(action.payload);
      state.data = state.data.filter((user) => user.id !== userId);
    });
  },
});

export default userSlice.reducer;
