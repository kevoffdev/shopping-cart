import { useId } from "react";

import { useCart } from "../hooks/useCart";

import { CartIcon, Trash } from "./Icon";

export const Cart = () => {
  const { cart, quantity, removeFromCart, incrementProductCart, decrementProductCart } = useCart();
  const cartCheckBoxId = useId();

  return (
    <div className="relative flex justify-end">
      <label
        className="block h-full p-3 bg-blue-400 rounded-full cursor-pointer hover:bg-blue-300"
        htmlFor={cartCheckBoxId}
      >
        <CartIcon />
      </label>
      <input className="hidden" id={cartCheckBoxId} type="checkbox" />

      <aside className="absolute right-0 z-10 text-black bg-white border border-gray-200 rounded-lg shadow-lg top-14 w-[480px] opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out transform scale-95">
        <label
          className="absolute text-gray-600 cursor-pointer right-2 top-2 hover:text-gray-800"
          htmlFor={cartCheckBoxId}
        >
          X
        </label>

        <ul className="p-4">
          <h2 className="mb-2 text-lg font-semibold">Cart</h2>
          {cart.length > 0 ? (
            cart.map((item) => {
              return (
                <li key={item.id} className="flex items-center mb-4">
                  <img
                    alt={item.title}
                    className="object-contain w-12 h-10 border-2 rounded-lg"
                    src={item.thumbnail}
                  />
                  <div className="flex-1 ml-4">
                    <strong>{item.title}</strong> - ${item.price}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 border"
                      onClick={() => incrementProductCart(item.id, item.stock)}
                    >
                      +
                    </button>
                    <small className="">{quantity[item.id]}</small>
                    <button className="p-1 border" onClick={() => decrementProductCart(item.id)}>
                      -
                    </button>
                    <button onClick={() => removeFromCart(item.id)}>{<Trash />}</button>
                  </div>
                </li>
              );
            })
          ) : (
            <p className="text-lg text-center">Cart empy.</p>
          )}
        </ul>
      </aside>
      <style>{`
        input:checked + aside {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};
