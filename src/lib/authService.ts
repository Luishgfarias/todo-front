import type {
  LoginSchema,
  RegisterSchema,
  UpdateUserSchema,
} from "../schemas/auth";
import { api } from "./axios";

// Tipos
interface User {
  id: string;
  nome: string;
  email: string;
}
interface LoginResponse {
  user: User;
  token: string;
}
// Interface do service
export interface AuthService {
  login(data: { email: string; senha: string }): Promise<LoginResponse>;
  register(data: { nome: string; email: string; senha: string }): Promise<void>;
  getMe(): Promise<User>;
  updateMe(data: UpdateUserSchema): Promise<User>;
  deleteMe(): Promise<void>;
  // refreshToken(): Promise<{ token: string }>;
}

// Implementação concreta usando cliente Axios
export const authService: AuthService = {
  login: async (data: LoginSchema) => {
    const response = await api.post<LoginResponse>("/login", data);
    return response.data;
  },

  register: async (data: RegisterSchema) => {
    await api.post("/usuario", data);
  },

  getMe: async () => {
    const response = await api.get<User>("/usuario");
    return response.data;
  },

  updateMe: async (data: UpdateUserSchema) => {
    const response = await api.put<User>("/usuario", data);
    return response.data;
  },

  deleteMe: async () => {
    await api.delete("/usuario");
  },
  // TODO: Implementar refresh token
  // refreshToken: async () => {
  //   const response = await api.post<{ token: string }>("/auth/refresh");
  //   return response.data;
  // },
};

// Exportar tipo User para usar em outros lugares
export type { User };
