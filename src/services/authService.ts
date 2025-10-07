import api from "./api";

interface LoginRequestDTO {
  email: string;
  password: string;
}
interface SignupRequestDTO extends LoginRequestDTO {
  username: string;
}

const AUTH_CONTROLLER_PATH = "/auth";

let accessToken: string | null = null;

export const authService = {
  getAccessToken: (): string | null => accessToken,

  setAccessToken: (token: string): void => {
    accessToken = token;
  },

  signup: async (data: SignupRequestDTO) => {
    const response = await api.post(`${AUTH_CONTROLLER_PATH}/signup`, data);

    accessToken = response.data.accessToken;

    return response.data;
  },

  login: async (data: LoginRequestDTO) => {
    const response = await api.post(`${AUTH_CONTROLLER_PATH}/login`, data);

    accessToken = response.data.accessToken;

    return response.data;
  },

  logout: async () => {
    await api.post(`${AUTH_CONTROLLER_PATH}/logout`);
    accessToken = null;
  },

  ping: async () => {
    const response = await api.get(`${AUTH_CONTROLLER_PATH}/ping`);

    console.log("Ping bem sucedido:", response.data);
    
    return response.data;
  },
};
