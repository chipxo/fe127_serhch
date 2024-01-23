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
      <motion.div
        className={`container py-4 rounded-b-md bg-base-100 ${navPos}`}
      >
        <ul className="grid grid-cols-2 sm:grid-cols-[0.2fr_1fr_1fr_0.2fr_0.5fr] place-items-center">
          <NavLink
            to="/"
            className="w-14 h-14 object-cover flex items-center justify-self-start"
          >
            <Logo />
          </NavLink>
          {links.map(({ to, text }: NavType) => (
            <Link key={nanoid()} to={to} text={text} />
          ))}
          <div className="divider divider-horizontal hidden sm:flex" />
          <SecondUl />
          <Burger />
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavBar;
