import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Logo from "../../common/Logo";
import Burger from "../../common/buttons/Burger";
import SecondUl from "./AsideBar";
import Search from "../../common/Search.tsx";
import Catalog from "./Catalog";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/rootReducer.tsx";
import { useAppDispatch } from "../../../app/store.tsx";
import { fetchCategories } from "../../../hooks/fetchCategories.tsx";
import { useEffect } from "react";

const NavBar = () => {
  const { categories } = useSelector((state: RootState) => state.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  // console.log(categories);

  return (
    <AnimatePresence>
      <motion.div className="container rounded-b-md bg-base-100 py-2">
        <ul className="grid max-h-[80px] grid-cols-[108px_1fr_0.1fr_0.1fr] place-items-center gap-x-4 md:grid-cols-[108px_1fr_0.23fr] lg:grid-cols-[108px_0.4fr_1.5fr_0.3fr]">
          <NavLink
            to="/"
            className="flex h-14 w-14 items-center justify-self-start object-cover"
          >
            <Logo />
          </NavLink>
          <Catalog categories={categories} />
          <div className="w-full xl:pr-8">
            <Search />
          </div>
          <SecondUl />
          <Burger />
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavBar;
