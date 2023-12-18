let red = document.querySelector("#red");
let yellow = document.querySelector("#yellow");
let green = document.querySelector("#green");
let btn = document.querySelector("#switchLight");
let clickCount = 0;

const colors = [red, yellow, green];
const colorsName = ["red", "yellow", "green"];

const changeColor = () => {
  let currentColor = colors[clickCount];
  const filterColors = colors.filter((color) => color !== currentColor);

  let currentColorName = colorsName[clickCount];
  const filterColorsName = colorsName.filter((color) => color !== currentColorName,);

  currentColor.classList.remove(`${colorsName[clickCount]}-dark`);
  currentColor.classList.add(`${colorsName[clickCount]}-bright`);
  filterColors[0].classList.remove(`${filterColorsName[0]}-bright`);
  filterColors[0].classList.add(`${filterColorsName[0]}-dark`);
  filterColors[1].classList.remove(`${filterColorsName[1]}-bright`);
  filterColors[1].classList.add(`${filterColorsName[1]}-dark`);

  clickCount <= 1 ? clickCount++ : (clickCount = 0);

  btn.addEventListener("click", changeColor);
};
changeColor();
