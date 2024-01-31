import {
  barCodeIcon,
  instagramIcon,
  tikTokIcon,
  twitterIcon,
} from "@/components/common/icons";

const Footer = () => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return year;
  };

  return (
    <footer className="footer footer-center mt-10 gap-y-4 bg-primary p-10 text-primary-content">
      <div>
        <h2 className="text-2xl font-bold md:text-4xl">Vivo.</h2>
        <p className="md:text-lg"> Providing reliable clothes since 2022</p>
        <p className="md:text-lg">
          Copyright © {getCurrentDate()} - All right reserved
        </p>
      </div>
      <nav>
        <div className="grid cursor-pointer grid-flow-col gap-4 text-3xl">
          <a
            href="https://www.instagram.com"
            target="_blank"
            className="transition-colors duration-200 hover:text-white"
          >
            {instagramIcon}
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            className="transition-colors duration-200 hover:text-white"
          >
            {twitterIcon}
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            className="transition-colors duration-200 hover:text-white"
          >
            {tikTokIcon}
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
