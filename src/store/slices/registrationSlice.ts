import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RegistrNewUser } from '../../api/registr';
import type { UserRegistration } from '../../types/auth';

interface RegistrationState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: RegistrationState = {
    loading: false,
    error: null,
    success: false,
}

export const registerUser = createAsyncThunk (
    'auth/register',
    async (userData: UserRegistration, {rejectWithValue}) => {
        try {
            await RegistrNewUser (
                userData.email,
                userData.login,
                userData.password,
                userData.phoneNumber,
                userData.username
            );
        } catch (error) {
            return rejectWithValue( error instanceof Error ? error.message : 'Ошибка регистрации');
        }
    }
)

const registrationSlice = createSlice({
    name: 'registration',
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
            })
    }
})

export const { resetRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;