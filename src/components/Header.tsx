import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="py-3 mt-2 text-center">
      <nav>
        <Link className="flex items-center justify-center gap-3 text-4xl font-bold" to={"/"}>
          Shopping Cart 🛒
        </Link>
      </nav>
    </header>
  );
};
