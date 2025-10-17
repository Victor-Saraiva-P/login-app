import { apiPublic } from "../../../global/http/clients";

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
    const response = await apiPublic.post(`${AUTH_CONTROLLER_PATH}/refresh-token`);

    return response.data;
  },

  signup: async (data: SignupRequestDTO): Promise<AuthResponseDTO> => {
    const response = await apiPublic.post(
      `${AUTH_CONTROLLER_PATH}/signup`,
      data
    );

    return response.data;
  },

  login: async (data: LoginRequestDTO): Promise<AuthResponseDTO> => {
    const response = await apiPublic.post(
      `${AUTH_CONTROLLER_PATH}/login`,
      data
    );

    return response.data;
  },

  logout: async () => {
    await apiPublic.post(`${AUTH_CONTROLLER_PATH}/logout`);
  },
};
