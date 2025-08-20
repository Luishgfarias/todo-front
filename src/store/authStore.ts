import { create } from "zustand";
import { userService } from "../services/userService";
import type { User } from "../lib/authService";
import type {
  LoginSchema,
  UpdateUserSchema,
} from "../schemas/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoadingProfile: boolean;
  login: (data: LoginSchema) => Promise<void>;
  loadMe: () => Promise<void>;
  updateMe: (data: UpdateUserSchema) => Promise<void>;
  deleteMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  isLoadingProfile: false,
  login: async (data: LoginSchema) => {
    set({ isLoading: true });
    try {
      const response = await userService.login(data);
      const { token, user } = response;
      localStorage.setItem("token", token);
      set({ token, user, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  loadMe: async () => {
    const { token } = get();
    if (!token) {
      userService.logout();
      return;
    }
    try {
      const user = await userService.getMe();
      set({ user });
    } catch (error) {
      userService.logout();
    }
  },

  updateMe: async (data: UpdateUserSchema) => {
    set({ isLoadingProfile: true });
    try {
      const updatedUser = await userService.updateMe(data);
      set({ user: updatedUser });
    } finally {
      set({ isLoadingProfile: false });
    }
  },

  deleteMe: async () => {
    set({ isLoadingProfile: true });
    try {
      await userService.deleteMe();
      userService.logout();
    } finally {
      set({ isLoadingProfile: false });
    }
  },
}));
