import { NavLink } from "react-router-dom";
import Logo from "@/components/common/Logo";
import SecondUl from "./AsideBar";
import Search from "../../../features/searchBar/Search.tsx";
import Catalog from "./CategoriesNav.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import { fetchCategories } from "@/hooks/fetchCategories.tsx";
import { useEffect } from "react";
import BurgerBar from "../burger/BurgerBar.tsx";

const NavBar = () => {
  const { categories } = useSelector((state: RootState) => state.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <nav className="bg-base-100 container rounded-b-md py-2">
      <ul className="grid max-h-[80px] grid-cols-[108px_1fr_0.1fr_0.1fr] place-items-center gap-x-4 sm:grid-cols-[108px_1fr_0.1fr_0.1fr] md:grid-cols-[108px_1fr_0.28fr] lg:grid-cols-[108px_0.22fr_1fr_0.28fr]">
        <NavLink
          to="/"
          className="flex h-14 w-14 items-center justify-self-start object-cover"
        >
          <Logo />
        </NavLink>
        <Catalog categories={categories} />
        <div className="w-full">
          <Search />
        </div>
        <SecondUl />
        <BurgerBar />
      </ul>
    </nav>
  );
};

export default NavBar;
