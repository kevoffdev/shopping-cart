import { toast } from "sonner";

import { StateCart } from "../context/cart";
import { CART_ACTION, CartAction } from "../types";

export const cartReducer = (state: StateCart, action: CartAction) => {
  switch (action.type) {
    case CART_ACTION.ADD_TO_CART: {
      const product = action.value;

      if (product.stock <= 0) return state;

      if (!state.quantity[product.id]) {
        const newState = {
          ...state,
          cart: state.cart.concat(product),
          quantity: { ...state.quantity, [product.id]: 1 },
        };

        window.localStorage.setItem("cart", JSON.stringify(newState));

        return newState;
      }

      return state;
    }

    case CART_ACTION.REMOVE_FROM_CART: {
      const id = action.value;
      const { [id]: _, ...items } = state.quantity;

      const data = state.cart.find((product) =>
        product.id === id ? product.title : "No se encontro",
      );

      toast.success(`${data?.title}`, {
        description: "Product removed from cart",
        className: "text-red-500",
      });

      const newState = {
        ...state,
        cart: state.cart.filter((itemCart) => itemCart.id !== id),
        quantity: items,
      };

      window.localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    case CART_ACTION.INCREMENT_PRODUCT_CART: {
      const value = action.value;

      const isProductInCart = state.cart.find((item) => item.id === value.id);

      if (isProductInCart && value.stock - state.quantity[value.id] === 0) return state;
      const newState = {
        ...state,
        quantity: { ...state.quantity, [value.id]: state.quantity[value.id] + 1 },
      };

      window.localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    case CART_ACTION.DECREMENT_PRODUCT_CART: {
      if (state.quantity[action.value] === 1) return state;
      const newState = {
        ...state,
        quantity: { ...state.quantity, [action.value]: state.quantity[action.value] - 1 },
      };

      window.localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }
    default:
      throw Error("Uknown action.");
  }
};
