import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./domains/home/HomePage.tsx";
import LoginComponent from "./domains/user/components/LoginComponent.tsx";
import SignUpComponent from "./domains/user/components/SignUpComponent.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
