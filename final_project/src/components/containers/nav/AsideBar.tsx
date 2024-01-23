import Theme2 from "../../common/ThemeSwapper";
import Search from "./SearchInput";
import ShoppingCartItem from "./CartList";

const SecondUl = () => {
  return (
    <ul className="hidden lg:grid grid-cols-3 items-center w-full gap-x-4">
      <li>
        <Search />
      </li>
      <li>
        <ShoppingCartItem />
      </li>
      <li>
        <Theme2 />
      </li>
    </ul>
  );
};

export default SecondUl;
