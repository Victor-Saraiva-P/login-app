import { useEffect, useState } from "react";
import ApiError from "../../../global/types/ApiError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../global/hooks/useAuth";
import toast from "react-hot-toast";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, accessToken } = useAuth();

  const navigate = useNavigate();


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email && password) {
      try {
        await login({ email, password });

        // Redirecionar para a página de ping após o login bem-sucedido
        navigate("/ping");
      } catch (error) {
        const apiError = new ApiError(error);
        // TODO: Encaminhar para uma página de error ou um pop up
        toast.error(`${apiError.title} - ${apiError.detail}`);
      }
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate("/ping");
    }
  }, [accessToken, navigate]);

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h2>Entrar</h2>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder="Senha"
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginComponent;
