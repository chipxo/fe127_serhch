import Facebook from "../common/FacebookLogo";
import Instagram from "../common/InstagramLogo";
import Twitter from "../common/TwitterLogo";

const SocialBar = ({ isHeader }) => {
  const display = isHeader ? "hidden lg:flex" : "flex";

  return (
    <div
      className={`${display} items-center gap-x-4 justify-self-end text-white`}
    >
      <Facebook />
      <Twitter />
      <Instagram />
    </div>
  );
};

export default SocialBar;
