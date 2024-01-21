import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="relative w-fit">
        <div
          tabIndex={0}
          role="button"
          className="btn bg-transparent border-none shadow-none"
        >
          <span className="text-lg">Theme</span>
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
          </svg>
        </div>
        <span
          style={{
            transform: open ? "scalex(1)" : "scalex(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-2 origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ x: "-50%" }}
              className="absolute left-1/2 top-10 "
            >
              <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
              <ul
                tabIndex={0}
                className="z-[1] w-52 rounded-2xl bg-base-300 p-2 shadow-2xl"
              >
                <li>
                  <input
                    type="radio"
                    className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                    aria-label="Default"
                    value="default"
                  />
                </li>

                <li>
                  <input
                    type="radio"
                    className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                    aria-label="Dark"
                    value="dracula"
                  />
                </li>

                <li>
                  <input
                    type="radio"
                    className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                    aria-label="Light"
                    value="winter"
                  />
                </li>

                <li>
                  <input
                    type="radio"
                    className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                    aria-label="Pink"
                    value="valentine"
                  />
                </li>

                <li>
                  <input
                    type="radio"
                    className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                    aria-label="Yellow"
                    value="retro"
                  />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    // <div className="dropdown dropdown-hover">

    // </div>
  );
};

export default ThemeSwitcher;
