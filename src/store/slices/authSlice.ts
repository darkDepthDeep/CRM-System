import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../services/axiosConfig";
import { tokenStorage } from "../../utils/tokenStorage";
import { tokenService } from "../../utils/tokenService";
import type { AuthData } from "../../types/auth";
import { refreshAccessToken } from "../../utils/refreshAccessToken";
import axios from "axios";

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    authChecked: boolean;
};

const initialState: AuthState = {
    isAuthenticated: !!tokenService.getAccessToken(),
    loading: false,
    error: null,
    authChecked: false,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (authData: AuthData, {rejectWithValue}) => {
        try {
            const response = await apiClient.post("/auth/signin", authData);

            tokenService.setAccessToken(response.data.accessToken);
            tokenStorage.setRefreshToken(response.data.refreshToken);

            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    return rejectWithValue('Неверные логин или пароль');
                }
                return rejectWithValue('Ошибка сервера попробуйте позже');
            }

            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            
            return rejectWithValue('Произошла неизвестная ошибка');
        }
    }
);

export const restoreSession = createAsyncThunk(
    'auth/restoreSession',
    async () => {
        const accessToken = tokenService.getAccessToken();
        const refreshToken = tokenStorage.getRefreshToken();

        if (accessToken) {
            return true;
        }

        if (refreshToken) {
            const newToken = await refreshAccessToken();
            return !!newToken;
        }

        return false;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            tokenService.clearAccessToken();
            tokenStorage.removeRefreshToken();
            state.isAuthenticated = false;
            state.authChecked = true;
        },
        
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
  builder
    
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.authChecked = true;
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
      state.authChecked = true;
    })

    

    .addCase(restoreSession.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(restoreSession.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = action.payload;
      state.authChecked = true;
      state.error = null;
    })
    .addCase(restoreSession.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.authChecked = true;
      state.error = null;
    });
}
})

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;