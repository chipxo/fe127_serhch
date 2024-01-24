import { nanoid } from "@reduxjs/toolkit";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../common/Logo";
import Burger from "../../common/buttons/Burger";
import links from "../../data/navLinks.json";
import { NavType } from "../../types/NavLinkType";
import Link from "./NavLink";
import SecondUl from "./AsideBar";
import Search from "./Search";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navPos = isScrolled ? "shadow-xl mt-0" : "mt-2";
  return (
    <AnimatePresence>
      <motion.div className={`container rounded-b-md bg-base-100 py-2`}>
        <ul className="grid grid-cols-2 place-items-center sm:grid-cols-[0.2fr_1fr_1fr_1fr_0.2fr_0.5fr]">
          <NavLink
            to="/"
            className="flex h-14 w-14 items-center justify-self-start object-cover"
          >
            <Logo />
          </NavLink>
          {links.map(({ to, text }: NavType) => (
            <Link key={nanoid()} to={to} text={text} />
          ))}
          <Search />
          <div className="divider divider-horizontal hidden sm:flex" />
          <SecondUl />
          <Burger />
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavBar;
