let red = document.querySelector("#red");
let yellow = document.querySelector("#yellow");
let green = document.querySelector("#green");
let btn = document.querySelector("#switchLight");
let clickCount = 0;

let colors = [red, yellow, green];
let colorsName = ["red", "yellow", "green"];

const changeColor = () => {
  const filterItems = (arr, curColors) => arr.filter((color) => color !== curColors);

  let currentColor = colors[clickCount];
  let currentColorName = colorsName[clickCount];

  let filterCurrentColors = filterItems(colors, currentColor);
  let filterCurrentColorsName = filterItems(colorsName, currentColorName);

  currentColor.classList.remove(`${colorsName[clickCount]}-dark`);
  currentColor.classList.add(`${colorsName[clickCount]}-bright`);
  filterCurrentColors[0].classList.remove(`${filterCurrentColorsName[0]}-bright`);
  filterCurrentColors[0].classList.add(`${filterCurrentColorsName[0]}-dark`);
  filterCurrentColors[1].classList.remove(`${filterCurrentColorsName[1]}-bright`);
  filterCurrentColors[1].classList.add(`${filterCurrentColorsName[1]}-dark`);

  clickCount <= 1 ? clickCount++ : (clickCount = 0);
};
changeColor();

btn.addEventListener("click", changeColor);
