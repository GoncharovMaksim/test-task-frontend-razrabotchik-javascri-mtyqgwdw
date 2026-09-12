import { FlashCard, ProfileFormData, UserProfileSummary } from '../types';
import { FAKE_USER, INITIAL_FLASHCARDS, INITIAL_PROFILE_VALUES } from './mockData';

const STORAGE_KEYS = {
  AUTH_USER: 'astral_auth_user',
  PROFILE_DATA: 'astral_profile_data',
  CARDS_DATA: 'astral_cards_data',
};

const delay = (ms: number = 300): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class MockApiService {
  static async login(username: string, password: string): Promise<UserProfileSummary> {
    await delay(350);
    // Correct login/password per specification: admin/admin
    if (username.trim().toLowerCase() === 'admin' && password === 'admin') {
      const user = { ...FAKE_USER };
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
        }
      } catch {
        // Ignore storage errors in restricted contexts
      }
      return user;
    }
    throw new Error('вход невозможен – неправильные логин или пароль');
  }

  static async logout(): Promise<void> {
    await delay(100);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      }
    } catch {
      // Ignore
    }
  }

  static async getStoredUser(): Promise<UserProfileSummary | null> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
        if (raw) return JSON.parse(raw);
      }
    } catch {
      // Ignore
    }
    return null;
  }

  static async getCards(): Promise<FlashCard[]> {
    await delay(250);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEYS.CARDS_DATA);
        if (raw) return JSON.parse(raw);
      }
    } catch {
      // Fallback to static
    }
    return [...INITIAL_FLASHCARDS];
  }

  static async getProfile(): Promise<ProfileFormData> {
    await delay(250);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEYS.PROFILE_DATA);
        if (raw) return JSON.parse(raw);
      }
    } catch {
      // Fallback
    }
    return { ...INITIAL_PROFILE_VALUES };
  }

  static async saveProfile(data: ProfileFormData): Promise<ProfileFormData> {
    await delay(400);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.PROFILE_DATA, JSON.stringify(data));
      }
    } catch {
      // Ignore
    }
    return data;
  }
}
