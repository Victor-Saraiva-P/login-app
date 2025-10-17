import axios, { type InternalAxiosRequestConfig } from "axios";
import { config } from "../../envVariables";
import { tokenManager } from "../utils/tokenManager";

export interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiSecure = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
});

export const apiPublic = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
});

// Injeta Bearer somente no httpAuth
apiSecure.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  const token = tokenManager.getToken();
  if (token) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }

  return cfg;
});
