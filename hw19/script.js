let header = {
  logo: {
    url: "#home",
    text: "logo",
    iconClass: "fas fa-bars",
  },
  nav: {
    1: {
      url: "#home",
      text: "Home",
    },
    2: {
      url: "#about",
      text: "About",
    },
    3: {
      url: "#portfolio",
      text: "Portfolio",
    },
    4: {
      url: "#contacts",
      text: "Contacts",
    },
  },
  btn: ["Log In", "Log Out"],
};

// Create header element and append it to the body
let headerElement = document.createElement("header");

// Add logo
let logoLink = document.createElement("a");
logoLink.href = header.logo.url;
logoLink.textContent = header.logo.text;
logoLink.classList.add("logo");
headerElement.appendChild(logoLink);

let iconElement = document.createElement("i");
iconElement.className = header.logo.iconClass;
headerElement.appendChild(iconElement); //

// Add navigation
let nav = document.createElement("nav");
for (let key in header.nav) {
  let navLink = document.createElement("a");
  navLink.href = header.nav[key].url;
  navLink.textContent = header.nav[key].text;
  navLink.classList.add("nav-link");
  nav.appendChild(navLink);
}
headerElement.appendChild(nav);

// Add buttons
let btnContainer = document.createElement("div");
header.btn.forEach((btnText) => {
  let btn = document.createElement("button");
  btn.textContent = btnText;
  btn.classList.add("header-btn");
  btnContainer.appendChild(btn);
});
headerElement.appendChild(btnContainer);

document.body.appendChild(headerElement);
