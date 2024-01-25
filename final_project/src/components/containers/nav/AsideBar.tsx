import { useLocation, useParams } from "react-router-dom";
import Theme2 from "../../slices/theme/ThemeSwapper.tsx";
import ShoppingCartItem from "./CartList";
import Filter from "./Filter";

const SecondUl = () => {
  const { pathname } = useLocation();
  const { categoryId } = useParams();
  return (
    <ul className="relative w-full grid-cols-2 items-center justify-items-end gap-x-4 border-neutral md:grid md:border-l">
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
