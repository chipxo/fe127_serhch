import Theme2 from "../../common/ThemeSwapper";
import Search from "./SearchInput";
import ShoppingCartItem from "./CartList";

const SecondUl = () => {
  return (
    <ul className="hidden w-full grid-cols-3 items-center gap-x-4 lg:grid">
      {/* <li>
        <Search />
      </li> */}
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
