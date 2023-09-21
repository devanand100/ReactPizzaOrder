import { useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { store } from "../../store";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isLoading = navigation.state === "submitting";
  const cart = useSelector((store) => store.cart.cart);
  const dispatch = useDispatch();

  if (!cart?.length) {
    return <EmptyCart />;
  }

  return (
    <div className="mt-3 mx-4">
      <h2 className="text-lg font-bold mt-6">Ready to order? Let&apos;s go!</h2>

      <Form method="POST" className="space-y-4 px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="mx-1 sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" required />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="mx-1 sm:basis-40">Phone number</label>
          <div className="grow ">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p>{formErrors.phone}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="mx-1 sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium ml-2 font-semibold">
            Want to you give your order priority?
          </label>
        </div>

        <div className="flex justify-end">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isLoading}>Order now</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please give Correct number";
  }

  if (Object.entries(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  if (newOrder?.id) {
    store.dispatch(clearCart());
  }
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
