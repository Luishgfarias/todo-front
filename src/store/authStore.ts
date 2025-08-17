import { create } from "zustand";
import { authService, type User } from "../lib/authService";
import type {
  LoginSchema,
  RegisterSchema,
  UpdateUserSchema,
} from "../schemas/auth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoadingProfile: boolean;

  // Actions
  login: (data: LoginSchema) => Promise<void>;
  register: (data: RegisterSchema) => Promise<void>;
  logout: () => void;
  loadMe: () => Promise<void>;
  updateMe: (data: UpdateUserSchema) => Promise<void>;
  deleteMe: () => Promise<void>;
  // refreshToken: () => Promise<void>;
}

// Store
export const useAuthStore = create<AuthState>((set, get) => ({
  // Estado inicial
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  isLoadingProfile: false,

  // Login
  login: async (data: LoginSchema) => {
    set({ isLoading: true });
    try {
      const response = await authService.login(data);
      const { token, user } = response;

      localStorage.setItem("token", token);
      set({ token, user, isAuthenticated: true });
      toast.success("Login realizado com sucesso");
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error(error instanceof AxiosError ? error.response?.data : "Erro ao fazer login");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Registro
  register: async (data: RegisterSchema) => {
    try {
      await authService.register(data);
      toast.success("Conta criada com sucesso");
    } catch (error) {
      console.error("Erro no registro:", error);
      toast.error(error instanceof AxiosError ? error.response?.data : "Erro ao criar conta");
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Carregar dados do usuário logado
  loadMe: async () => {
    try {
      const { token } = get();
      if (!token) {
        get().logout();
        return;
      }

      const user = await authService.getMe();
      set({ user });
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      toast.error(error instanceof AxiosError ? error.response?.data : "Erro ao carregar usuário");
      get().logout();
    }
  },

  // Atualizar dados do usuário
  updateMe: async (data: UpdateUserSchema) => {
    set({ isLoadingProfile: true });
    try {
      const updatedUser = await authService.updateMe(data);
      set({ user: updatedUser });
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error(error instanceof AxiosError ? error.response?.data : "Erro ao atualizar usuário");
      throw error;
    } finally {
      set({ isLoadingProfile: false });
    }
  },

  // Deletar conta
  deleteMe: async () => {
    set({ isLoadingProfile: true });
    try {
      await authService.deleteMe();
      toast.success("Conta deletada com sucesso");
      get().logout(); // Logout após deletar conta
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      toast.error(error instanceof AxiosError ? error.response?.data : "Erro ao deletar conta");
      throw error;
    } finally {
      set({ isLoadingProfile: false });
    }
  },
  // TODO: Implementar refresh token
  // Renovar token
  // refreshToken: async () => {
  //   try {
  //     const response = await authService.refreshToken();
  //     const { token } = response;

  //     localStorage.setItem("token", token);
  //     set({ token });
  //   } catch (error) {
  //     console.error("Erro ao renovar token:", error);
  //     // Se não conseguir renovar, fazer logout
  //     get().logout();
  //     throw error;
  //   }
  // },
}));
