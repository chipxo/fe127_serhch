import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../common/CompanyLogo";
import SectionsTitle from "../common/SectionsTitle";
import SocialBar from "../containers/SocialBar";
import Form from "../containers/form/Form";
import links from "../data/footerLinks";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="scroll-mt-[6.8rem] bg-footer bg-cover bg-center pb-8 md:scroll-mt-[40vh] md:pb-0"
    >
      <div className="mx-auto grid max-w-[770px] gap-y-8 md:p-4 md:pb-[200px]">
        <div className="relative bg-white bg-center px-6 py-10 sm:bg-form md:-top-[10rem] md:px-10 md:py-14 lg:px-12">
          {/* Title */}
          <SectionsTitle
            isBgDark={false}
            isTitle={true}
            text={"Get in touch"}
          />

          {/* Links and Form*/}
          <div className="grid gap-y-6 md:grid-cols-2">
            <div className="mt-4 grid items-center justify-items-center gap-x-20 gap-y-8 font-[Montserrat] text-[15px] text-black sm:grid-cols-2 sm:justify-items-start md:mt-0 md:grid-cols-1 md:gap-y-4 md:text-[18px]">
              {links.map(({ id, icon, text, link }) => (
                <a
                  key={id}
                  href={link}
                  className="relative -ml-4 h-fit pl-6 sm:ml-0"
                >
                  <span className="to absolute -left-0 mr-4 text-[15px] text-mid-purple md:top-[3px]">
                    <FontAwesomeIcon icon={icon} />
                  </span>
                  {text}
                </a>
              ))}
            </div>

            {/* Form */}
            <Form />
          </div>
        </div>

        {/* Nav */}
        <nav className="grid place-items-center gap-y-6 text-white md:grid md:grid-cols-2">
          <div className="grid gap-y-6 md:gap-y-10 md:justify-self-start">
            <Logo href={"#aboutUs"} />
            <p className="font-[Montserrat]">Copyrights © 2020 Montichello</p>
          </div>
          <ul className="md:justify-self-end">
            <SocialBar isHeader={false} />
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;