import { useFilter } from "./hooks/useFilter";
import { Products } from "./components/Products";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/cart";

export function App() {
  const { products } = useFilter();

  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen max-w-screen-lg grid-rows-[auto,auto,1fr,50px]">
        <Header />
        <Cart />
        {products ? <Products /> : <div>loading...</div>}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
