import {
  faCartShopping,
  faCheck,
  faMagnifyingGlass,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;
export const cartUser = <FontAwesomeIcon className="mr-2" icon={faUser} />;
export const cartDelete = <FontAwesomeIcon icon={faTrash} />;
export const cartChecked = (
  <FontAwesomeIcon icon={faCheck} className="text-accent scale-90 ml-2" />
);
export const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
