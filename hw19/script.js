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

let headerElement = document.createElement("header");

let logoLink = document.createElement("a");
logoLink.href = header.logo.url;
logoLink.textContent = header.logo.text;
logoLink.classList.add("logo");
headerElement.appendChild(logoLink);

let iconElement = document.createElement("i");
iconElement.className = header.logo.iconClass;
headerElement.appendChild(iconElement);

let nav = document.createElement("nav");

let ul = document.createElement("ul");

for (let key in header.nav) {
  let navItem = document.createElement("li");
  let navLink = document.createElement("a");
  navLink.href = header.nav[key].url;
  navLink.textContent = header.nav[key].text;
  navItem.appendChild(navLink);
  ul.appendChild(navItem);
}

nav.appendChild(ul);
headerElement.appendChild(nav);

let btnContainer = document.createElement("div");
btnContainer.classList.add("header-btn");
iconElement.addEventListener("click", () => {
  btnContainer.classList.toggle("header-btn");
  btnContainer.classList.toggle("nav-btn");
});
header.btn.forEach((btnText) => {
  let btn = document.createElement("button");
  btn.textContent = btnText;
  btn.classList.add("btn");
  btnContainer.appendChild(btn);
});

iconElement.addEventListener("click", () => {
  ul.classList.toggle("nav-link");
});

const removeClassIfLargeScreen = () => {
  if (window.innerWidth > 1024) {
    ul.classList.remove("nav-link");
    btnContainer.classList.remove("nav-btn");
    btnContainer.classList.add("header-btn");
  }
};

removeClassIfLargeScreen();

window.addEventListener("resize", removeClassIfLargeScreen);

headerElement.appendChild(btnContainer);

document.body.appendChild(headerElement);
