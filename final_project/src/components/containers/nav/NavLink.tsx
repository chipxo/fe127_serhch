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

        {/* {isDropDown && open && (
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                style={{ x: "-50%" }}
                className="absolute left-1/2 top-14"
              >
                <div className="w-full h-4 bg-transparent absolute z-[999] -top-4" />
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        )} */}
      </NavLink>
    </li>
  );
};

export default Link;
