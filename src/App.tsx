import "./App.css";
import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";
import PingComponent from "./components/PingComponent";
import SignUpComponent from "./components/SignUpComponent";

function App() {
  return (
    <>
      <SignUpComponent />
      <LoginComponent />
      <PingComponent />
      <LogoutComponent />
    </>
  );
}

export default App;
