import ApiError from "../../../global/types/ApiError";
import { userService } from "../features/userService";

function PingComponent() {
  async function handleClick() {
    try {
      await userService.ping();
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
