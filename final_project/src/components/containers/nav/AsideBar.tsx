import { useLocation, useParams } from "react-router-dom";
import Theme2 from "../../slices/theme/ThemeSwapper.tsx";
import ShoppingCartItem from "./CartList";
import Filter from "./Filter";

const SecondUl = () => {
  const { pathname } = useLocation();
  const { categoryId } = useParams();
  return (
    <ul className="relative hidden w-full grid-cols-2 place-items-center gap-x-4 lg:grid">
      <li>
        <ShoppingCartItem />
      </li>
      <li>
        <Theme2 />
      </li>
      {(pathname === "/products" ||
        pathname === `/products/categories/${categoryId}`) && (
        <li className="absolute -right-12 top-0 cursor-pointer">
          <Filter />
        </li>
      )}
    </ul>
  );
};

export default SecondUl;
