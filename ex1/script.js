let burger = document.querySelector(".burger");
let header = document.querySelector(".header");
let main = document.querySelector(".main");
let footer = document.querySelector(".footer");
burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  header.classList.toggle("active");
  main.classList.toggle("blur");
  footer.classList.toggle("blur");
});
