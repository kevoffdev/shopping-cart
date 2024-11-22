import { useFilter } from "./hooks/useFilter";
import { Products } from "./components/Products";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/cart";
import { Filters } from "./components/Filters";

export function App() {
  const { products } = useFilter();

  return (
    <CartProvider>
      <div className="bg-background text-primary">
        <div className="m-auto grid min-h-screen px-10  md:max-w-screen-lg grid-rows-[auto,auto,1fr,50px]">
          <Header />
          <Cart />
          <main className="my-4">
            <Filters />
            {products ? <Products /> : <div>loading...</div>}
          </main>
          <Footer />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
