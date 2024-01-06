import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Nav from "../containers/NavBar";
import links from "../data/navLinks.json";

const Burger = () => {
  const [burger, setBurger] = useState(false);

  return (
    <div
      className="grid place-items-end transition hover:cursor-pointer md:hidden"
      onClick={() => setBurger(!burger)}
    >
      {/* Nav*/}
      <Nav links={links} isBurger={burger} />

      {/* Burger */}
      <FontAwesomeIcon
        icon={burger ? faX : faBars}
        className="relative z-[999] justify-self-end text-5xl text-white"
      />
    </div>
  );
};

export default Burger;
