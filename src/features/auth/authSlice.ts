import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import { User } from '../../types/User';

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

interface LoginCredentials {
  credentials: {
    username: string;
    password: string;
  };
  onSuccess: (user: User) => void; // optional callback
  onError?: (message: string) => void;
}

interface ApiError {
  message: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error de autenticación';
      });
  },
});

export const login = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: ApiError }
>('auth/login', async ({ credentials, onSuccess, onError }, thunkAPI) => {
  try {
    const { data } = await api.post<User>('/auth/login', credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
    onSuccess(data);
    return data;
  } catch (err: any) {
    const message =
      err.response?.data?.message || err.message || 'Error de autenticación';
    onError?.(message);
    return thunkAPI.rejectWithValue({ message });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
