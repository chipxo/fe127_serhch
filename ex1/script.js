const body = document.querySelector(".body");
const burger = document.querySelector(".burger");
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const anchors = document.querySelectorAll(".anchor");
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  header.classList.toggle("active");
  main.classList.toggle("blur");
  footer.classList.toggle("blur");
});
for (const anchor of anchors) {
  anchor.addEventListener("click", () => {
    anchor.classList.toggle("hide");
    body.classList.toggle("hidden");
    header.classList.remove("active");
    burger.classList.remove("active");
    main.classList.remove("blur");
    footer.classList.remove("blur");
  });
}
setInterval(() => {
  body.classList.remove("hidden");
  for (const anchor of anchors) {
    anchor.classList.remove("hide");
  }
}, 500);
