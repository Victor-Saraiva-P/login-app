import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./domains/welcome/WelcomePage.tsx";
import LoginComponent from "./domains/user/components/LoginComponent.tsx";
import SignUpComponent from "./domains/user/components/SignUpComponent.tsx";
import PingComponent from "./domains/user/components/PingComponent.tsx";
import "./global/http/authInterceptor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/signup" element={<SignUpComponent />} />
      <Route path="/ping" element={<PingComponent />} />
      <Route path="*" element={<Navigate to="/welcome" />} />
    </Routes>
  );
}

export default App;
