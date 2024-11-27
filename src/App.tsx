import { HashRouter } from "react-router";

import { CartProvider } from "./context/cart";
import { FiltersProvider } from "./context/filters";
import AppRouter from "./router/AppRouter";

export function App() {
  return (
    <HashRouter>
      {/* <BrowserRouter> */}
      <FiltersProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </FiltersProvider>
      {/* </BrowserRouter> */}
    </HashRouter>
  );
}

export default App;
