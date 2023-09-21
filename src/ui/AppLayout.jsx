import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

export default function AppLayout() {
  const { state } = useNavigation();
  console.log(state);
  const isLoading = state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]  ">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl w-full ">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}
