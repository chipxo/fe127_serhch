import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../../common/ThemeSwitcher";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const localStorageItems = window.localStorage.length;
      setAmount(localStorageItems > 0 ? localStorageItems : 0);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const navPos = isScrolled ? "shadow-xl" : "";
  return (
    <div
      className={`grid grid-cols-header container py-4 rounded-b-md bg-base-100 ${navPos}`}
    >
      <div className="lg:navbar-start hidden">
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow space-y-1"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/shoppingCart">
                <div className="indicator">
                  Shopping cart
                  {amount > 0 && (
                    <span className="badge indicator-item badge-primary badge-md translate-x-[120%]">
                      {amount}
                    </span>
                  )}
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:navbar-center grid">
        <ul className="grid grid-cols-4">
          <li className="w-fit h-fit mx-auto">
            <NavLink to="/" className="btn btn-ghost text-lg">
              Logo
            </NavLink>
          </li>
          <li className="w-fit h-fit mx-auto">
            <ThemeSwitcher />
          </li>
          <li className="w-fit h-fit mx-auto">
            <NavLink className="btn btn-ghost text-lg" to="/">
              Home
            </NavLink>
          </li>
          <li className="w-fit h-fit mx-auto">
            <NavLink className="btn btn-ghost text-lg" to="/shop">
              Shop
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="lg:navbar-end relative">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </summary>
              <div className="form-control absolute right-0 top-14 transition-all">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                />
              </div>
            </details>
          </li>
        </ul>
        <NavLink to="/shoppingCart" onClick={(e) => e.preventDefault}>
          <button className="btn btn-circle btn-ghost">
            <div className="indicator">
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              {amount > 0 && (
                <span className="badge indicator-item badge-primary badge-md">
                  {amount}
                </span>
              )}
            </div>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
