import { Link } from "react-router";
import { toast } from "sonner";

import { RemoveFromCartIcon, AddToCartIcon } from "./Icon";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/ui/card";
import { Button } from "@/ui/button";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";

const CardProduct = ({
  product,
  isProductInCart,
  activeButton,
}: {
  product: Product;
  isProductInCart?: boolean;
  activeButton: boolean;
}) => {
  const { quantity, addToCart, removeFromCart } = useCart();

  return (
    <Card key={product.id} className="grid grid-rows-[90px,auto,auto] bg-card place-items-center">
      <CardHeader>
        <CardTitle className="text-lg">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Link target="_top" to={`/${product.id}`}>
            <img alt={product.title} className="object-cover" src={product.thumbnail} />
          </Link>
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
      {activeButton && (
        <CardFooter>
          {isProductInCart ? (
            <Button className="px-8 hover:text-red-400" onClick={() => removeFromCart(product.id)}>
              <RemoveFromCartIcon />
            </Button>
          ) : (
            <Button
              className="px-8 hover:text-green-400"
              onClick={() => {
                toast.success(`${product.title} - $${product.price}`, {
                  description: "Product added to cart",
                }),
                  addToCart(product);
              }}
            >
              <AddToCartIcon />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default CardProduct;
