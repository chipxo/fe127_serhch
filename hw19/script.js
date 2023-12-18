let header = {
  logo: {
    url: "#home",
    text: "logo",
  },
  iconClass: "fas fa-bars",
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

let logo = document.createElement("a");
logo.href = header.logo.url;
logo.textContent = header.logo.text;
logo.classList.add("logo");
headerElement.appendChild(logo);

let icon = document.createElement("i");
icon.className = header.iconClass;
headerElement.appendChild(icon);

let nav = document.createElement("nav");

let ul = document.createElement("ul");

for (let num in header.nav) {
  let nav = document.createElement("li");
  let navLink = document.createElement("a");
  navLink.href = header.nav[num].url;
  navLink.textContent = header.nav[num].text;
  nav.appendChild(navLink);
  ul.appendChild(nav);
}

nav.appendChild(ul);
headerElement.appendChild(nav);

let btnContainer = document.createElement("div");
btnContainer.classList.add("header-btn");

for (let name of header.btn) {
  btn = document.createElement("button");
  btn.textContent = name;
  btn.classList.add("btn");
  btnContainer.appendChild(btn);
}

icon.addEventListener("click", () => {
  btnContainer.classList.toggle("header-btn");
  btnContainer.classList.toggle("nav-btn");
  ul.classList.toggle("nav-link");
});

const removeClass = () => {
  if (window.innerWidth > 1024) {
    ul.classList.remove("nav-link");
    btnContainer.classList.remove("nav-btn");
    btnContainer.classList.add("header-btn");
  }
};
removeClass();

window.addEventListener("resize", removeClass);

headerElement.appendChild(btnContainer);

document.body.appendChild(headerElement);
