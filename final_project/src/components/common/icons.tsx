import {
  faArrowRight,
  faCaretRight,
  faCartShopping,
  faCheck,
  faEye,
  faFilter,
  faMagnifyingGlass,
  faTrash,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;
export const cartUser = <FontAwesomeIcon className="text-2xl" icon={faUser} />;
export const cartDelete = <FontAwesomeIcon icon={faTrash} />;
export const cartChecked = (
  <FontAwesomeIcon icon={faCheck} className="ml-2 text-lg text-info" />
  // <span className="ml-2 w-fit text-warning/10">Added to Cart!</span>
);
export const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;

export const filterIcon = (
  <FontAwesomeIcon icon={faFilter} className="relative z-[999]" />
);
export const toRightIcon = (
  <FontAwesomeIcon className="mx-1.5" icon={faCaretRight} />
);
// export const catalogIcon = <FontAwesomeIcon icon={faLayerGroup} />;
export const catalogIcon = <FontAwesomeIcon icon={faMicrosoft} />;
export const goToRightIcon = (
  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
);
export const googleIcon = <FontAwesomeIcon icon={faGoogle} />;
export const closeIcon = <FontAwesomeIcon icon={faX} />;

export const showPasswordIcon = <FontAwesomeIcon icon={faEye} />;
