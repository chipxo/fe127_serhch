import Theme2 from "../../../features/theme/ThemeSwapper.tsx";
import ShoppingCartItem from "./CartList";

const AsideBar = () => {
  return (
    <ul className="w-full grid-cols-2 items-center justify-items-end gap-x-4 border-neutral md:grid md:border-l">
      <li>
        <ShoppingCartItem />
      </li>
      <li>
        <Theme2 />
      </li>
    </ul>
  );
};

export default AsideBar;
