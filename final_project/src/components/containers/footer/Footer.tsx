import {
  instagramIcon,
  tikTokIcon,
  twitterIcon,
} from "@/components/common/icons";
import { nanoid } from "@reduxjs/toolkit";

const Footer = () => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return year;
  };

  const links = [
    { link: "https://www.instagram.com", icon: instagramIcon },
    { link: "https://www.twitter.com", icon: twitterIcon },
    { link: "https://www.tiktok.com", icon: tikTokIcon },
  ];

  return (
    <footer className="bg-footer-bg grid place-items-center gap-y-4 bg-background bg-cover bg-center p-10 text-center">
      <div>
        <h2 className="mb-4 text-2xl font-bold md:text-4xl">Vivo.</h2>
        <p className="md:text-lg"> Providing reliable clothes since 2022</p>
        <p className="md:text-lg">
          Copyright © {getCurrentDate()} - All right reserved
        </p>
      </div>
      <nav>
        <ul className="grid cursor-pointer grid-flow-col gap-4 text-3xl">
          {links.map(({ link, icon }) => (
            <li key={nanoid()}>
              <a
                href={link}
                target="_blank"
                className="transition-colors duration-200 hover:text-white"
              >
                {icon}
              </a>
            </li>
          ))}
          {/* <li>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="transition-colors duration-200 hover:text-white"
            >
              {instagramIcon}
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="transition-colors duration-200 hover:text-white"
            >
              {twitterIcon}
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              className="transition-colors duration-200 hover:text-white"
            >
              {tikTokIcon}
            </a>
          </li> */}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
