import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Instagram = () => {
  return (
    <a
      href="#"
      className="border-social-border rounded-full border px-[10px] pb-[4px] pt-[5px] transition hover:scale-105 hover:border-white"
    >
      <FontAwesomeIcon icon={faInstagram} />
    </a>
  );
};

export default Instagram;
