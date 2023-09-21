/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantity } from "../cart/cartSlice";
import Add from "../../assets/add.svg";
import Close from "../../assets/close.svg";
import Remove from "../../assets/remove.svg";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
} from "../cart/cartSlice";
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantity(id));
  console.log(currentQuantity);
  const newItem = {
    pizzaId: id,
    name,
    quantity: 1,
    unitPrice,
    totalPrice: unitPrice,
  };
  return (
    <li className="flex gap-4 p-3">
      <img
        src={imageUrl}
        alt={name}
        height="130px"
        width="150px"
        className={` border-2 rounded-md border-primary ${
          soldOut ? "opacity-70 grayscale" : ""
        }`}
      />
      <div className="flex flex-col py-2 grow">
        <p className="text-md font-semibold ">{name}</p>
        <p className="text-stone-500">{ingredients.join(", ")}</p>
        <div className="mt-auto flex justify-between items-end flex-wrap">
          {!soldOut ? (
            <p className="pb-1 mt-4 sm:mt-0"> {formatCurrency(unitPrice)}</p>
          ) : (
            <p>Sold out</p>
          )}
          {!soldOut && currentQuantity === 0 && (
            <Button onClick={() => dispatch(addItem(newItem))}>
              Add To Cart
            </Button>
          )}

          {currentQuantity > 0 && (
            <div className="flex items-end ">
              <Button
                type="roundedPrimary"
                onClick={() => dispatch(decreaseItemQuantity(id))}
              >
                <img src={Remove} height="20px" width="20px" />
              </Button>
              <span className="text-xl p-1 text-center font-semibold">
                {currentQuantity}
              </span>
              <Button
                type="roundedPrimary"
                onClick={() => dispatch(increaseItemQuantity(id))}
              >
                <img src={Add} height="20px" width="20px" />
              </Button>
              <Button
                classes="ml-3 "
                type="roundedLight"
                onClick={() => dispatch(deleteItem(id))}
              >
                <img src={Close} height="20px" width="20px" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
