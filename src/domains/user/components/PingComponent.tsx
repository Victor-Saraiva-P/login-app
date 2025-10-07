import { authService } from "../features/authService";
import ApiError from "../../../global/types/ApiError";

function PingComponent() {
  async function handleClick() {
    try {
      await authService.ping();
    } catch (error) {
      const appError = new ApiError(error);
      console.log(appError.detail);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Ping</button>
    </div>
  );
}

export default PingComponent;
