// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";
// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const order = useLoaderData();
  const fetcher = useFetcher();
  // console.log(fetcher.data);
  // console.log("fetcher", fetcher);
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  useEffect(
    function () {
      console.log("fetcher state", fetcher.state, fetcher.data);
      if (!fetcher.data && fetcher.state === "idle") {
        console.log("fetcher runs");
        fetcher.load("/menu");
      }
    },
    [fetcher]
  );

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mt-5 mx-5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="py-2 rounded-full text-white px-3 bg-red-500 uppercase text-sm font-bold">
              Priority
            </span>
          )}
          <span className="py-2 rounded-full text-white px-3 bg-green-600 uppercase text-sm font-bold">
            {status} order
          </span>
        </div>
      </div>

      <div className="bg-stone-200 p-4 my-8 flex justify-between shadow-md ">
        <p className="text-md font-bold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm font-thin text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="  dive-stone-200 divide-y border-b border-t my-8 ">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            // isLoadingIngredients={fetcher.state === "loading"}
            // ingredients={
            //   fetcher?.data?.find((el) => el.id === item.pizzaId)
            //     ?.ingredients ?? []
            // }
          />
        ))}
      </ul>

      <div className="bg-stone-200 p-4 leading-8 tracking-widest space-y-3 shadow-md ">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="text-sm ">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }) {
  console.log("params", params);
  const order = await getOrder(params.orderId);

  return order;
}

export default Order;
