import { Product } from "../types";
import { useFilter } from "../hooks/useFilter";
import { useCart } from "../hooks/useCart";

import { AddToCartIcon, RemoveFromCartIcon } from "./Icon";
import { Button } from "./ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Products = () => {
  const { filterProducts } = useFilter();
  const { cart, quantity, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product: Product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <section className="grid  sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {filterProducts().map((product) => {
        const isProductInCart = checkProductInCart(product);

        return (
          <Card
            key={product.id}
            className="grid grid-rows-[90px,auto,auto] bg-card place-items-center"
          >
            <CardHeader>
              <CardTitle className="text-lg">{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <img alt={product.title} className="object-cover" src={product.thumbnail} />
              </div>
              <CardTitle className="flex flex-col gap-2 text-base">
                <span>{product.title}</span>
                <span>${product.price}</span>
              </CardTitle>
              <CardDescription className="mt-2">
                <p>
                  Quantity:{" "}
                  {quantity[product.id] > 0 ? product.stock - quantity[product.id] : product.stock}
                </p>
              </CardDescription>
            </CardContent>
            <CardFooter>
              {isProductInCart ? (
                <Button
                  className="px-8 hover:text-red-400"
                  onClick={() => removeFromCart(product.id)}
                >
                  <RemoveFromCartIcon />
                </Button>
              ) : (
                <Button className="px-8 hover:text-green-400" onClick={() => addToCart(product)}>
                  <AddToCartIcon />
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};
