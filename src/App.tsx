import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HomeRouter from "./global/router/HomeRouter.tsx";
import UserRouter from "./global/router/UserRouter.tsx";

function App() {
  return (
    <BrowserRouter>
      <HomeRouter />
      <UserRouter />
    </BrowserRouter>
  );
}

export default App;
