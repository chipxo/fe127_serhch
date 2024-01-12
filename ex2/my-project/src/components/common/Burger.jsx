import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Nav from "../containers/NavBar";
import links from "../data/navLinks.json";

const Burger = () => {
  const [burger, setBurger] = useState(false);

  return (
    <div
      onClick={() => setBurger(!burger)}
      className="grid place-items-end md:hidden"
    >
      {" "}
      <Nav links={links} isBurger={burger} isHeader={false} />
      {/* Burger */}
      {/* <label className="btn swap swap-rotate relative z-[999] border-none bg-transparent p-0 text-white shadow-none">
    
        <input type="checkbox" onClick={() => setBurger(!burger)} />

    
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

  
        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label> */}
      <FontAwesomeIcon
        icon={burger ? faX : faBars}
        className="relative z-[999] h-[48px] w-[48px] justify-self-end text-white"
      />
    </div>
  );
};

export default Burger;
