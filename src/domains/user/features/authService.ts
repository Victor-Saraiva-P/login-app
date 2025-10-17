import apiClient from "../../../global/api/apiClient";

export interface LoginRequestDTO {
  email: string;
  password: string;
}
interface SignupRequestDTO extends LoginRequestDTO {
  username: string;
}

interface AuthResponseDTO {
  accessToken: string;
}

const AUTH_CONTROLLER_PATH = "/auth";

export const authService = {
  refreshToken: async (): Promise<AuthResponseDTO> => {
    const response = await apiClient.post(`${AUTH_CONTROLLER_PATH}/refreshToken`);

    return response.data.accessToken;
  },

  signup: async (data: SignupRequestDTO): Promise<AuthResponseDTO> => {
    const response = await apiClient.post(
      `${AUTH_CONTROLLER_PATH}/signup`,
      data
    );

    return response.data.accessToken;
  },

  login: async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
    const response = await apiClient.post(
      `${AUTH_CONTROLLER_PATH}/login`,
      data
    );

    return response.data.accessToken;
  },

  logout: async () => {
    await apiClient.post(`${AUTH_CONTROLLER_PATH}/logout`);
  },

  ping: async () => {
    const response = await apiClient.get(`${AUTH_CONTROLLER_PATH}/ping`);

    console.log("Ping bem sucedido:", response.data);

    return response.data;
  },
};
