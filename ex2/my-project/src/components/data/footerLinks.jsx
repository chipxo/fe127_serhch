import {
  faClock,
  faInbox,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const links = [
  {
    id: 1,
    icon: faLocationDot,
    text: "91 Nolan Extensions Suite 670",
    link: "https://google.com/maps",
  },
  {
    id: 2,
    icon: faPhone,
    text: "+001 356-868-2454",
    link: "tel:+001356-868-2454 ",
  },
  {
    id: 3,
    icon: faInbox,
    text: "montichello@service.com",
    link: "mailto:montichello@service.com",
  },
  {
    id: 4,
    icon: faClock,
    text: "From 07:05AM to 19:30PM",
    link: "#aboutUs",
  },
];

export default links;
