import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Facebook = () => {
  return (
    <>
      <a
        href="#"
        className="border-social-border rounded-full border px-[12px] py-1 transition hover:scale-105 hover:border-white"
      >
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
    </>
  );
};

export default Facebook;
