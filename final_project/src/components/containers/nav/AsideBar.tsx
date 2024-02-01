import ShoppingCartItem from "./CartList";
import User from "../user/User.tsx";
import { ModeToggle } from "@/features/theme/mode-toggle.tsx";

const AsideBar = () => {
  return (
    <ul className="hidden w-full items-center justify-items-center gap-x-4 border-neutral sm:grid md:grid-cols-3 xl:border-l">
      <li className="hidden sm:block">
        <ShoppingCartItem />
      </li>
      <li className="hidden md:block w-min">
        <ModeToggle />
      </li>
      <li className="hidden md:block">
        <User />
      </li>
    </ul>
  );
};

export default AsideBar;
