import { authService } from "../features/authService";
import ApiError from "../../../global/types/ApiError";

function LogoutComponent() {
  async function handleClick() {
    try {
      await authService.logout();
    } catch (error) {
      const appError = new ApiError(error);
      console.log(appError.detail);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default LogoutComponent;
