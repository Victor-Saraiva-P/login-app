import api from "./api";

interface LoginRequestDTO {
  email: string;
  password: string;
}
interface SignupRequestDTO extends LoginRequestDTO {
  username: string;
}

const AUTH_CONTROLLER_PATH = "/auth";

export const authService = {
  signup: async (data: SignupRequestDTO) => {
    const response = await api.post(`${AUTH_CONTROLLER_PATH}/signup`, data);
    return response.data;
  },

  login: async (data: LoginRequestDTO) => {
    const response = await api.post(`${AUTH_CONTROLLER_PATH}/login`, data);
    return response.data;
  },
};
