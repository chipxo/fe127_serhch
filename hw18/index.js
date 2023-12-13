const buttonAdd = document.querySelector("#addItem");
const addProduct = document.querySelector("#addProduct");
const addPrice = document.querySelector("#addPrice");
let par = document.querySelector("#hideMe");

let shoppingList = [];

const displayList = () => {
  const ul = document.querySelector("ul");

  ul.innerHTML = "";

  if (shoppingList.length === 0) {
    par.textContent = "Make your shopping list";
    return;
  } else {
    par.textContent = "Your list";
  }

  shoppingList.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="font-bold">${item.productName}:</span></br>
      count: ${item.count},</br>
      price for 1 ${item.productName}: ${item.pricePerOne},</br>
      total sum: ${item.sum}</br>
      <button class="btn-increment" data-index="${index}">+</button>
      <button class="btn-decrement" data-index="${index}">-</button>
      <button class="btn-delete" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
    `;

    ul.appendChild(li);

    const deleteButton = li.querySelector(".btn-delete");
    deleteButton.addEventListener("click", () => {
      shoppingList.splice(index, 1);
      displayList();
    });

    const incrementButton = li.querySelector(".btn-increment");
    incrementButton.addEventListener("click", () => {
      item.count += 1;
      item.sum += item.pricePerOne;
      displayList();
    });

    const decrementButton = li.querySelector(".btn-decrement");
    decrementButton.addEventListener("click", () => {
      if (item.count > 0) {
        item.count -= 1;
        item.sum -= item.pricePerOne;
        displayList();
      }
    });
  });
};

displayList();

const buttonOnClick = () => {
  const productName = addProduct.value.trim();
  const pricePerOne = parseFloat(addPrice.value);

  if (productName && !isNaN(pricePerOne)) {
    par.textContent = "Your list";

    const existingProductIndex = shoppingList.findIndex(
      (item) => item.productName === productName,
    );

    if (existingProductIndex !== -1) {
      shoppingList[existingProductIndex].count += 1;
      shoppingList[existingProductIndex].sum += pricePerOne;
    } else {
      shoppingList.push({
        productName: productName,
        count: 1,
        pricePerOne: pricePerOne,
        sum: pricePerOne,
      });
    }

    displayList();

    console.log(shoppingList);
  } else {
    alert("Please enter a valid product name and price.");
  }

  addProduct.value = "";
  addPrice.value = "";
};

const handleEnterKey = (event) => {
  if (event.key === "Enter") {
    buttonOnClick();
  }
};

window.addEventListener("keydown", handleEnterKey);

buttonAdd.addEventListener("click", buttonOnClick);
