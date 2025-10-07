import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../domains/home/HomePage";

function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default HomeRouter;
