import {
  faGoogle,
  faInstagram,
  faMicrosoft,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faBarcode,
  faBars,
  faCaretRight,
  faCartShopping,
  faEye,
  faFilter,
  faTrash,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;
export const cartUser = <FontAwesomeIcon className="text-xl" icon={faUser} />;
export const cartDelete = <FontAwesomeIcon icon={faTrash} />;
export const filterIcon = (
  <FontAwesomeIcon icon={faFilter} className="relative z-[999]" />
);
export const toRightIcon = <FontAwesomeIcon icon={faCaretRight} />;
export const catalogIcon = <FontAwesomeIcon icon={faMicrosoft} />;
export const goToRightIcon = (
  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
);
export const googleIcon = <FontAwesomeIcon icon={faGoogle} />;
export const closeIcon = <FontAwesomeIcon icon={faX} />;
export const showPasswordIcon = <FontAwesomeIcon icon={faEye} />;
export const burgerIcon = <FontAwesomeIcon icon={faBars} />;
export const twitterIcon = <FontAwesomeIcon icon={faXTwitter} />;
export const instagramIcon = <FontAwesomeIcon icon={faInstagram} />;
export const tikTokIcon = <FontAwesomeIcon icon={faTiktok} />;
export const barCodeIcon = <FontAwesomeIcon icon={faBarcode} />;
