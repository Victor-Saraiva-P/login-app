import { useState } from "react";
import ApiError from "../../../global/types/ApiError";
import { authService } from "../features/authService";
import { useNavigate } from "react-router-dom";

function SignUpComponent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username && email && password) {
      try {
        await authService.signup({ username, email, password });

        // Redirecionar para a página de ping após o signup bem-sucedido
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
      <h2>Registrar</h2>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        type="text"
        placeholder="Nome de usuário"
      />
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
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default SignUpComponent;
