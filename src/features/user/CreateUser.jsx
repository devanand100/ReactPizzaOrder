import { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { setUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
function CreateUser() {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (userName.length > 0) {
      dispatch(setUser(userName));
      navigate("/menu");
    }
  }

  useEffect(() => {
    const time = setTimeout(() => {
      inputRef.current.focus();
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="text-center mt-5 mx-1 flex flex-col items-center"
    >
      <p className="text-lg">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        ref={inputRef}
        className="input w-72 my-4"
        type="text"
        placeholder="Your full name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      {userName !== "" && <Button classes=" mt-4">Start ordering</Button>}
    </form>
  );
}

export default CreateUser;
