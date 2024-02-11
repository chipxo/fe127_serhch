import User from "@/features/registration/user/User.tsx";
import { ModeToggle } from "@/features/theme/mode-toggle.tsx";
import ShoppingCartItem from "./CartList";

const AsideBar = () => {
  return (
    <ul className="border-neutral grid w-full items-center justify-items-center gap-x-3 md:grid-cols-3 xl:border-l xl:pl-4">
      <li className="">
        <ShoppingCartItem />
      </li>
      <li className="hidden w-min md:block">
        <ModeToggle />
      </li>
      <li className="hidden md:block">
        <User />
      </li>
    </ul>
  );
};

export default AsideBar;
