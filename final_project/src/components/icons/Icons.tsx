import {
  faCaretRight,
  faCartShopping,
  faCheck,
  faFilter,
  faMagnifyingGlass,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;
export const cartUser = <FontAwesomeIcon className="mr-2" icon={faUser} />;
export const cartDelete = <FontAwesomeIcon icon={faTrash} />;
export const cartChecked = (
  <FontAwesomeIcon icon={faCheck} className="ml-2 text-lg text-info" />
  // <span className="ml-2 w-fit text-warning/10">Added to Cart!</span>
);
export const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;

export const filterIcon = <FontAwesomeIcon icon={faFilter} />;
export const toRightIcon = <FontAwesomeIcon icon={faCaretRight} />;
