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

  for (let i = 0; i < filterCurrentColors.length; i++) {
    filterCurrentColors[i].classList.remove(`${filterCurrentColorsName[i]}-bright`);
    filterCurrentColors[i].classList.add(`${filterCurrentColorsName[i]}-dark`);
  }

  clickCount < 2 ? clickCount++ : (clickCount = 0);
};
changeColor();

btn.addEventListener("click", changeColor);
