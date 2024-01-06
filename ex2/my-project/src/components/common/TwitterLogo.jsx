import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Twitter = () => {
  return (
    <a
      href="#"
      className="border-social-border rounded-full border px-[8px] pb-[4px] pt-[5px] transition hover:scale-105 hover:border-white"
    >
      <FontAwesomeIcon icon={faTwitter} />
    </a>
  );
};

export default Twitter;
