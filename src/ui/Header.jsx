import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/user/User";

export default function Header() {
  return (
    <header className="flex bg-primary text-secondary justify-between p-4 items-center shadow-md">
      <Link to="/" className="text-2xl tracking-light uppercase ">
        The React Pizza co.
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}
