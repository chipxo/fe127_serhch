import { burgerIcon } from "@/components/common/icons";

const Burger = () => {
  return (
    <div className="grid cursor-pointer items-center justify-self-end text-3xl md:hidden">
      {burgerIcon}
    </div>
  );
};

export default Burger;
