import axios from "axios";

// Configuração base do Axios
export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// TODO: Implementar refresh token

// Interceptor para refresh automático
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Se for 401 (token expirado) e ainda não tentou refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Evita loop infinito

//       try {
//         // Importação dinâmica para evitar dependência circular
//         const { useAuthStore } = await import('../store/authStore');
        
//         console.log('Token expirado, tentando renovar...');
//         await useAuthStore.getState().refreshToken();

//         // Atualiza header da requisição original com novo token
//         const newToken = useAuthStore.getState().token;
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;

//         // Refaz a requisição original
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Falha ao renovar token:", refreshError);

//         // Se refresh falhar, fazer logout
//         const { useAuthStore } = await import('../store/authStore');
//         useAuthStore.getState().logout();

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
