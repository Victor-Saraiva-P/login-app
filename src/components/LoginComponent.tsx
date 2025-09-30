import { useState } from "react";
import ApiError from "../types/ApiError";
import { authService } from "../services/authService";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email && password) {
      try {
        await authService.login({ email, password });

        // TODO: Encaminhar para uma página de home ou algo do tipo
        console.log("Sucesso no seu login");
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
