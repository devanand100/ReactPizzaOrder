import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { clearCart } from "./cartSlice";

function Cart() {
  const cart = useSelector((store) => store.cart.cart);
  const dispatch = useDispatch();
  console.log(cart, cart.length);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-4 sm:mx-20 mt-3">
      <LinkButton to="/menu" classes="mb-6 text-lg">
        &larr; Back to menu
      </LinkButton>

      <h2 className="text-xl font-bold">Your cart ,</h2>

      <ul className="divide-y divide-stone-300 my-4">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-x-3 flex justify-end">
        <Button>
          <Link to="/order/new">Order pizzas</Link>
        </Button>
        <Button type="light" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
