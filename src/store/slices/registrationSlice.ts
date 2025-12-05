import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UserRegistration } from "../../types/auth";
import { apiClient } from "../../services/axiosConfig";
import axios from "axios";

interface RegistrationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegistrationState = {
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  "registration/register",
  async (userData: UserRegistration, { rejectWithValue }) => {
    try {
      await apiClient.post("/auth/signup", userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          return rejectWithValue(
            "Пользователь с такими данными уже существует!"
          );
        }
        return rejectWithValue("Ошибка сервера. Попробуйте позже!");
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Неизвестная ошибка!");
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
