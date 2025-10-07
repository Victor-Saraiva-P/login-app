import { Route, Routes } from "react-router-dom";
import LoginComponent from "../../domains/user/components/LoginComponent";
import SignUpComponent from "../../domains/user/components/SignUpComponent";

function UserRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/signup" element={<SignUpComponent />} />
    </Routes>
  );
}

export default UserRouter;
