import { ReactNode } from "react";
import { Toaster } from "sonner";

import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background text-primary">
      <div className="m-auto grid min-h-screen px-10  md:max-w-screen-lg grid-rows-[auto,auto,1fr,50px]">
        <Header />
        <Cart />
        <main className="my-4">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
