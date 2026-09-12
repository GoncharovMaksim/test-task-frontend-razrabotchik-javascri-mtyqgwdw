import { describe, it, expect, beforeEach } from 'vitest';
import authReducer, { clearAuthError, loginUser, logoutUser } from '../features/auth/authSlice';
import { MockApiService } from '../api/mockApi';

describe('Auth Module & MockApiService', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  it('authenticates successfully with correct credentials (admin / admin)', async () => {
    const user = await MockApiService.login('admin', 'admin');
    expect(user).toBeDefined();
    expect(user.username).toBe('admin');
    expect(user.fullName).toBe('Максим Гончаров');
  });

  it('rejects invalid credentials with exact error from specification', async () => {
    await expect(MockApiService.login('user', 'wrongpass')).rejects.toThrow(
      'вход невозможен – неправильные логин или пароль'
    );
  });

  it('handles authSlice login fulfilled and logout states', () => {
    const initialState = {
      isAuthenticated: false,
      user: null,
      error: null,
      isLoading: false,
    };

    const loggedInUser = {
      username: 'admin',
      fullName: 'Максим Гончаров',
      email: 'goncharov.m@astral.ru',
      role: 'Middle Frontend Developer',
    };

    const loggedInState = authReducer(
      initialState,
      loginUser.fulfilled(loggedInUser, 'req-id', { username: 'admin', password: 'admin' })
    );

    expect(loggedInState.isAuthenticated).toBe(true);
    expect(loggedInState.user?.username).toBe('admin');
    expect(loggedInState.error).toBeNull();

    const loggedOutState = authReducer(loggedInState, logoutUser.fulfilled(null, 'req-id'));
    expect(loggedOutState.isAuthenticated).toBe(false);
    expect(loggedOutState.user).toBeNull();
  });

  it('clears auth error on clearAuthError dispatch', () => {
    const errorState = {
      isAuthenticated: false,
      user: null,
      error: 'вход невозможен – неправильные логин или пароль',
      isLoading: false,
    };

    const clearedState = authReducer(errorState, clearAuthError());
    expect(clearedState.error).toBeNull();
  });
});
