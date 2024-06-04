import { useContext } from "react";

import { CartContext } from "../context/cart";

export function useCart() {
  const { cart, quantity, addToCart, removeFromCart, incrementProductCart, decrementProductCart } =
    useContext(CartContext);

  return { cart, quantity, addToCart, removeFromCart, incrementProductCart, decrementProductCart };
}
