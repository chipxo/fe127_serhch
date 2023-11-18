let burger = document.querySelector(".burger");
let header = document.querySelector(".header");
burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  header.classList.toggle("active");
});
