import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = useSelector((store) => store.user.userName);
  const navigate = useNavigate();

  return (
    <div className="px-3 max-w-72">
      <h1 className="text-center text-3xl font-bold my-12">
        The best pizza.
        <br />
        <span className="text-red-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {user ? (
        <div className="text-center">
          <Button onClick={() => navigate("/menu")} classes="whitespace-nowrap">
            Continue Ordering {user}
          </Button>
        </div>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
