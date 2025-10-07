const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente VITE_API_URL não está definida. Verifique seu arquivo .env"
  );
}

if (!API_BASE_PATH) {
  throw new Error(
    "A variável de ambiente VITE_API_BASE_PATH não está definida. Verifique seu arquivo .env"
  );
}

const API_BASE_URL = `${API_URL}${API_BASE_PATH}`;

export const config = {
  apiBaseUrl: API_BASE_URL,
};
