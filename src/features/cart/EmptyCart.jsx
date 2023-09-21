import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="mt-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <div className="text-center">
        <p className="my-8 text-lg">
          Your cart is still empty. Start adding some pizzas :)
        </p>
        <Button onClick={() => navigate("/menu")}>Start Ordering</Button>
      </div>
    </div>
  );
}

export default EmptyCart;
