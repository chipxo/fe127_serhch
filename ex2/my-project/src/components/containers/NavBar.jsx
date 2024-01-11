import { useEffect, useState } from "react";

const Nav = ({ links, isBurger, isHeader }) => {
  const [activeLinkId, setActiveLinkId] = useState(
    links.length > 0 ? links[0].id : null,
  );

  const showOnClick = isBurger
    ? "duration-500"
    : "-translate-y-full duration-300";

  const navStyle = `bg-news md:hidden absolute left-0 top-0 grid h-screen w-full place-items-center bg-cover ${showOnClick}`;

  const ulBurger = "place-items-center gap-y-24 text-2xl font-bold";

  const ulHeader = "grid-cols-4 justify-items-center text-sm";

  const linkMarker =
    "before:absolute before:-left-4 before:top-[7px] before:hidden before:h-2 before:w-2 before:rounded-full before:border before:content-[''] hover:before:bg-white focus:before:bg-white md:before:inline-block";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      let isSectionView = false;

      links.forEach(({ id, href }) => {
        const targetSection = document.getElementById(href.substring(1));

        if (
          targetSection &&
          scrollPosition >= targetSection.offsetTop - 550 &&
          scrollPosition <
            targetSection.offsetTop - 550 + targetSection.offsetHeight
        ) {
          setActiveLinkId(id);
          isSectionView = true;
        }
      });

      !isSectionView && setActiveLinkId(null);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  return (
    <nav id="nav" className={isHeader ? "hidden md:block" : navStyle}>
      <ul
        className={`grid pt-[2px] uppercase text-white
        ${isHeader ? ulHeader : ulBurger}`}
      >
        {links.map(({ id, title, href }) => (
          <li key={id} className="relative transition md:text-xl">
            <a
              href={href}
              className={`relative ${linkMarker} 
              ${activeLinkId === id && "before:bg-white"}`}
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
