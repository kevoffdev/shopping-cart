export enum OptionCategorie {
  All = "All Products",
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export enum CART_ACTION {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  INCREMENT_PRODUCT_CART = "INCREMENT_PRODUCT_CART",
  DECREMENT_PRODUCT_CART = "DECREMENT_PRODUCT_CART",
}

export type CartAction =
  | { type: CART_ACTION.ADD_TO_CART; value: Product }
  | { type: CART_ACTION.REMOVE_FROM_CART; value: Product["id"] }
  | {
      type: CART_ACTION.INCREMENT_PRODUCT_CART;
      value: { id: Product["id"]; stock: Product["stock"] };
    }
  | { type: CART_ACTION.DECREMENT_PRODUCT_CART; value: Product["id"] };
