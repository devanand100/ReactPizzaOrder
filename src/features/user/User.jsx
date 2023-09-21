import { useSelector } from "react-redux";

export default function User() {
  const userName = useSelector((store) => store.user.userName);

  return (
    <div className="hidden sm:block text-2xl font-semibold">{userName}</div>
  );
}
