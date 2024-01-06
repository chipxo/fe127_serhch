import { useEffect, useState } from "react";

const Nav = ({ links, isBurger }) => {
  const [activeLinkId, setActiveLinkId] = useState(
    links.length > 0 ? links[0].id : null,
  );

  const showOnClick = isBurger
    ? "duration-500"
    : "-translate-y-full duration-300";

  const navStyle = `bg-news absolute left-0 top-0 grid h-screen w-full place-items-center bg-cover ${showOnClick}`;

  const ulBurger = "place-items-center gap-y-24 text-2xl font-bold";

  const ulHeader = "grid-cols-4 justify-items-center text-sm";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      let isSectionView = false;

      links.forEach(({ id, href }) => {
        const targetSection = document.getElementById(href.substring(1));
        if (
          targetSection &&
          scrollPosition >= targetSection.offsetTop - 450 &&
          scrollPosition <
            targetSection.offsetTop - 450 + targetSection.offsetHeight
        ) {
          setActiveLinkId(id);
          isSectionView = true;
        }
      });

      if (!isSectionView) {
        setActiveLinkId(null);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  return (
    <nav
      id="nav"
      className={window.innerWidth < 768 ? navStyle : "hidden md:block"}
    >
      <ul
        className={`${
          window.innerWidth < 768 ? ulBurger : ulHeader
        } grid pt-[4px] uppercase text-white`}
      >
        {links.map(({ id, title, href }) => (
          <li
            key={id}
            className="relative transition hover:scale-105 md:text-xl"
          >
            <a
              href={href}
              className={`relative ${activeLinkId === id ? "active" : ""}`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
