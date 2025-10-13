import { useState } from "react";
import ApiError from "../../../global/types/ApiError";
import { authService } from "../features/authService";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email && password) {
      try {
        await authService.login({ email, password });

        // Redirecionar para a página de ping após o login bem-sucedido
        navigate("/ping");
      } catch (error) {
        const appError = new ApiError(error);
        // TODO: Encaminhar para uma página de error ou um pop up
        console.log(appError.detail);
      }
    }
  }

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
