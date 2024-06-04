import { ReactNode, createContext, useReducer } from "react";

import { CART_ACTION, Product } from "../types";
import { cartReducer } from "../reducers/cart";

export interface StateCart {
  cart: Product[];
  quantity: Record<number, number>;
}

export interface CartContextProps {
  cart: Product[];
  quantity: Record<number, number>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: Product["id"]) => void;
  incrementProductCart: (id: Product["id"], stock: Product["stock"]) => void;
  decrementProductCart: (id: Product["id"]) => void;
}

const stateLocalStorage = JSON.parse(window.localStorage.getItem("cart")!);

const initialState: StateCart = stateLocalStorage ?? { cart: [], quantity: {} };

const initialContextCart: CartContextProps = {
  cart: [],
  quantity: {},
  addToCart: () => {},
  removeFromCart: () => {},
  incrementProductCart: () => {},
  decrementProductCart: () => {},
};

export const CartContext = createContext<CartContextProps>(initialContextCart);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) =>
    dispatch({ type: CART_ACTION.ADD_TO_CART, value: product });

  const removeFromCart = (id: Product["id"]) =>
    dispatch({ type: CART_ACTION.REMOVE_FROM_CART, value: id });

  const incrementProductCart = (id: Product["id"], stock: Product["stock"]) =>
    dispatch({ type: CART_ACTION.INCREMENT_PRODUCT_CART, value: { id, stock } });

  const decrementProductCart = (id: Product["id"]) =>
    dispatch({ type: CART_ACTION.DECREMENT_PRODUCT_CART, value: id });

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        quantity: state.quantity,
        addToCart,
        removeFromCart,
        incrementProductCart,
        decrementProductCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
