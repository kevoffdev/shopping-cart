import { Navigate, Route, Routes } from "react-router";

import { Home } from "@/pages/Home";
import Product from "@/pages/ProductDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Product />} path="/:id" />

      <Route element={<Navigate to="/" />} path="/*" />
    </Routes>
  );
};

export default AppRouter;
