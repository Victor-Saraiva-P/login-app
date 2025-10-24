import axios from "axios";

class ApiError {
  status: number;
  type: string;
  title: string;
  detail: string;

  constructor(error: unknown) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data ?? {};
      this.status = Number(data.status ?? error.response?.status ?? 500);
      this.type = data.type ?? "api/error";
      this.title = data.title ?? "Erro na requisição";
      this.detail =
        typeof data.detail === "string"
          ? data.detail
          : data.detail
          ? JSON.stringify(data.detail)
          : error.message ?? "Ocorreu um erro inesperado.";
    } else if (error instanceof Error) {
      this.status = 500;
      this.type = "front-end/unexpected-error";
      this.title = "Erro de sistema";
      this.detail = error.message || "Erro no sistema, tente novamente.";
    } else {
      this.status = 500;
      this.type = "front-end/unexpected-error";
      this.title = "Erro de sistema";
      this.detail = "Erro no sistema, tente novamente.";
    }
  }
}

export default ApiError;
