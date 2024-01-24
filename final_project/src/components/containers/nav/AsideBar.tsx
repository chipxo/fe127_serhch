import Theme2 from "../../common/ThemeSwapper";
import ShoppingCartItem from "./CartList";
import Filter from "./Filter";

const SecondUl = () => {
  return (
    <ul className="hidden w-full grid-cols-2 items-center gap-x-4 lg:grid">
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
