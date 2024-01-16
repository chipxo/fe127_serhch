import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Nav from "../containers/NavBar";
import links from "../data/navLinks.json";

const Burger = () => {
  const [burger, setBurger] = useState(false);

  return (
    <div onClick={() => setBurger(!burger)} className="grid md:hidden">
      <Nav links={links} isBurger={burger} isHeader={false} />

      {/* Burger */}
      <FontAwesomeIcon
        icon={burger ? faX : faBars}
        className="relative z-[999] h-[48px] w-[48px] justify-self-end text-white"
      />
    </div>
  );
};

export default Burger;
