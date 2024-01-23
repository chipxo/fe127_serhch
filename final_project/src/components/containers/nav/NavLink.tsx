import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavType } from "../../types/NavLinkType";

const Link = ({ to, text }: NavType) => {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative hidden sm:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink to={to} className=" font-semibold text-lg">
        {text}

        <span
          style={{
            transform: open ? "scalex(1)" : "scalex(0)",
          }}
          className="absolute -bottom-3 -left-3 -right-3 h-2 origin-left rounded-full bg-primary transition-transform duration-300 ease-out"
        />
      </NavLink>
    </li>
  );
};

export default Link;
