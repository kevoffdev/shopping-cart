import { useCart } from "../hooks/useCart";

import { CartIcon, Trash } from "./Icon";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Cart = () => {
  const { cart, quantity, removeFromCart, incrementProductCart, decrementProductCart } = useCart();

  const totalProducts = Object.keys(quantity);

  const sumTotalProducts = cart
    .reduce(
      (sum, product) =>
        quantity[product.id] ? (sum += product.price * quantity[product.id]) : sum,
      0,
    )
    .toFixed(2);

  return (
    <Sheet>
      <div className="flex items-center justify-end">
        <SheetTrigger className="w-auto p-3 rounded-full text-primary-foreground bg-primary">
          <CartIcon />
        </SheetTrigger>
      </div>
      <SheetContent className="w-[250px] md:w-full overflow-auto bg-background text-primary">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <SheetDescription className="flex flex-col gap-2">
          <span>Products in the cart: {totalProducts.length}</span>
          <span>Total price ${sumTotalProducts}</span>
        </SheetDescription>
        <div className="text-primary">
          <ul className="p-4">
            {cart.length > 0 ? (
              cart.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="flex flex-col items-center justify-between gap-2 py-5 border-b md:flex-row border-foreground"
                  >
                    <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
                      <img
                        alt={item.title}
                        className="object-contain w-12 h-10 border rounded-lg border-foreground"
                        src={item.thumbnail}
                      />
                    </div>
                    <div className="flex flex-col items-center flex-1 gap-1 ml-2 md:items-start">
                      <span className="font-bold">{item.title}</span>
                      <span>${(item.price * quantity[item.id]).toFixed(2)}</span>
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                      <div className="grid grid-cols-3 place-items-center">
                        <Button
                          className="w-full md:w-auto"
                          onClick={() => incrementProductCart(item.id, item.stock)}
                        >
                          +
                        </Button>
                        <small>{quantity[item.id]}</small>
                        <Button
                          className="w-full md:w-auto"
                          onClick={() => decrementProductCart(item.id)}
                        >
                          -
                        </Button>
                      </div>
                      <Button
                        className="w-full md:w-auto"
                        variant={"destructive"}
                        onClick={() => removeFromCart(item.id)}
                      >
                        {<Trash />}
                      </Button>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="text-lg text-center">Cart empy.</li>
            )}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
