import { apiSecure } from "../../../global/http/clients";

export interface LoginRequestDTO {
  email: string;
  password: string;
}


const USER_CONTROLLER_PATH = "/users";

export const userService = {
  ping: async () => {
    const response = await apiSecure.get(`${USER_CONTROLLER_PATH}/ping`);

    console.log("Ping bem sucedido:", response.data);

    return response.data;
  },
};
