import api from "./api";

interface SignupRequestDTO {
  username: string;
  email: string;
  password: string;
}

const AUTH_CONTROLLER_PATH = "/auth";

export const authService = {
  signup: async (data: SignupRequestDTO) => {
    const response = await api.post(`${AUTH_CONTROLLER_PATH}/signup`, data);
    return response.data;
  },
};
