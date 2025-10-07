import { authService } from "./authService";
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { config } from "../config";

const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true, // axios enviar cookies
});

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

async function refreshToken(){
  const response = await api.post("/auth/refresh-token");
  return response.data.accessToken;
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    // Usamos nossa interface customizada aqui
    const originalRequest: RetryableAxiosRequestConfig | undefined =
      error.config;

    // Verifica se o erro é 401, se a requisição original existe e se ainda não tentamos novamente
    if (
      error.response?.status === 403 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Marca para evitar loops

      try {
        console.log("Access Token expirado. Tentando renovar...");

        const newAccessToken = await refreshToken();

        authService.setAccessToken(newAccessToken);

        // Atualiza o cabeçalho da requisição original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        console.log("Token renovado. Refazendo a chamada original...");
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          "Não foi possível renovar o token. Deslogando...",
          refreshError
        );
        await authService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
