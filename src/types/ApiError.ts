import axios from "axios";

class ApiError {
  status: number;
  type: string;
  title: string;
  detail: string;

  constructor(error: unknown) {
    if (axios.isAxiosError(error)) {
      this.status = error.response?.data.status;
      this.type = error.response?.data.type;
      this.title = error.response?.data.title;
      this.detail = error.response?.data.detail;
    } else {
      // Error genérico
      this.status = 500;
      this.type = 'front-end/unexpected-error';
      this.title = 'Erro de sistema';
      this.detail = '"Erro no sistema tente novamente"';
    }
  }
}

export default ApiError;
