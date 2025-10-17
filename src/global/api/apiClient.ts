import { authService } from "../../domains/user/features/authService";
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { config } from "../../envVariables";
import { tokenManager } from "../utils/tokenManager";

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true, // axios enviar cookies
});

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

async function refreshToken(){
  const response = await apiClient.post("/auth/refresh-token");
  return response.data.accessToken;
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
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

        tokenManager.setToken(newAccessToken);

        // Atualiza o cabeçalho da requisição original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        console.log("Token renovado. Refazendo a chamada original...");
        return apiClient(originalRequest);
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

export default apiClient;
