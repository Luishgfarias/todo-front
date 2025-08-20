import { toast } from "react-hot-toast";
import { authService, type User } from "../lib/authService";
import { handleServiceError } from "../lib/errorHandler";
import type { LoginSchema, RegisterSchema, UpdateUserSchema } from "../schemas/auth";

interface LoginResponse {
  user: User;
  token: string;
}

export const userService = {
  async login(data: LoginSchema): Promise<LoginResponse> {
    try {
      const response = await authService.login(data);
      toast.success("Login realizado com sucesso");
      return response;
    } catch (error) {
      handleServiceError(error, "Erro ao fazer login");
      throw error;
    }
  },

  async register(data: RegisterSchema): Promise<void> {
    try {
      await authService.register(data);
      toast.success("Conta criada com sucesso");
    } catch (error) {
      handleServiceError(error, "Erro ao criar conta");
      throw error;
    }
  },

  async getMe(): Promise<User> {
    try {
      return await authService.getMe();
    } catch (error) {
      handleServiceError(error, "Erro ao carregar usuário");
      throw error;
    }
  },

  async updateMe(data: UpdateUserSchema): Promise<User> {
    try {
      const updatedUser = await authService.updateMe(data);
      toast.success("Perfil atualizado com sucesso");
      return updatedUser;
    } catch (error) {
      handleServiceError(error, "Erro ao atualizar usuário");
      throw error;
    }
  },

  async deleteMe(): Promise<void> {
    try {
      await authService.deleteMe();
      toast.success("Conta deletada com sucesso");
    } catch (error) {
      handleServiceError(error, "Erro ao deletar conta");
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem("token");
    
    // Limpa todos os stores
    import("../store/authStore").then(({ useAuthStore }) => {
      useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
    });
    
    import("../store/taskStore").then(({ useTaskStore }) => {
      useTaskStore.getState().clearStore();
    });
  }
};
