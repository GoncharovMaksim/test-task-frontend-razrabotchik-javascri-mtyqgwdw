import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MockApiService } from '../../api/mockApi';
import { AuthState, UserProfileSummary } from '../../types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
};

export const checkStoredAuth = createAsyncThunk(
  'auth/checkStored',
  async () => {
    const user = await MockApiService.getStoredUser();
    return user;
  }
);

export const loginUser = createAsyncThunk<
  UserProfileSummary,
  { username: string; password: string },
  { rejectValue: string }
>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await MockApiService.login(username, password);
      return user;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'вход невозможен – неправильные логин или пароль';
      return rejectWithValue(msg);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await MockApiService.logout();
    return null;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check stored
      .addCase(checkStoredAuth.fulfilled, (state, action: PayloadAction<UserProfileSummary | null>) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserProfileSummary>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || 'вход невозможен – неправильные логин или пароль';
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
