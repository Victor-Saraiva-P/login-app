import type { AxiosError, AxiosResponse } from "axios";
import { apiSecure, type RetryableAxiosRequestConfig } from "./clients";
import { tokenManager } from "../utils/tokenManager";
import { authService } from "../../domains/user/features/authService";

let refreshPromise: Promise<string> | null = null;

async function doRefresh(): Promise<string> {
  const { accessToken } = await authService.refreshToken();
  return accessToken;
}

apiSecure.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    console.log(
      "Interceptor de resposta acionado devido a um erro:",
      error.message
    );
    const original = error.config as RetryableAxiosRequestConfig | undefined;
    const status = error.response?.status;

    // Nunca tente renovar se a falha for do próprio refresh (por via das dúvidas)
    if (original?.url?.includes("/auth/refresh-token")) {
      await authService.logout().catch(() => {});
      return Promise.reject(error);
    }

    const shouldRetry =
      (status === 401 || status === 403) && original && !original._retry;
    if (!shouldRetry) return Promise.reject(error);

    original._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = doRefresh().finally(() =>
          setTimeout(() => (refreshPromise = null), 0)
        );
      }
      const newAccessToken = await refreshPromise;
      tokenManager.setToken(newAccessToken);

      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newAccessToken}`;

      return apiSecure(original);
    } catch (e) {
      await authService.logout().catch(() => {});
      return Promise.reject(e);
    }
  }
);

// não exporta nada; apenas registra o interceptor
