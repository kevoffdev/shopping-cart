import { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getProducts } from "./services/api";
import { Product } from "./types";
import { Products } from "./components/Products";

export function App() {
  const [products, setProducts] = useState<null | Product[]>(null);

  useEffect(() => {
    getProducts().then((resp) => setProducts(resp));
  }, []);

  return (
    <div className="mx-auto grid min-h-screen max-w-screen-lg grid-rows-[auto,1fr,50px]">
      <Header />
      {products ? <Products products={products} /> : <div>loading...</div>}
      <Footer />
    </div>
  );
}

export default App;
