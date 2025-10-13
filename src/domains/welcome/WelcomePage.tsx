import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="container">
      <h1>Bem-vindo ao Sistema</h1>
      <nav>
        <Link to="/login" className="nav-link">
          Fazer Login
        </Link>{" "}
        |{" "}
        <Link to="/signup" className="nav-link">
          Registrar-se
        </Link>
      </nav>
    </div>
  );
}

export default WelcomePage;
