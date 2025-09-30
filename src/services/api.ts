import axios from "axios";
import { config } from "../config";

const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true, // axios enviar cookies
});

export default api;
