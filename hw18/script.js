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

  for (let i = 0; i < shoppingList.length; i++) {
    const item = shoppingList[i];
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="font-bold">${item.productName}:</span></br>
      count: ${item.count},</br>
      price for 1 ${item.productName}: ${item.pricePerOne},</br>
      total sum: ${item.sum}</br>
      <button class="btn-increment" data-index="${i}">More</button>
      <button class="btn-decrement" data-index="${i}">Less</button>
      <button class="btn-delete" data-index="${i}">Delete</button>
    `;

    ul.appendChild(li);

    const deleteButton = li.querySelector(".btn-delete");
    deleteButton.addEventListener("click", () => {
      const index = parseInt(deleteButton.dataset.index, 10);

      shoppingList.splice(index, 1);

      displayList();
    });

    const incrementButton = li.querySelector(".btn-increment");
    incrementButton.addEventListener("click", () => {
      const index = parseInt(incrementButton.dataset.index, 10);

      shoppingList[index].count += 1;
      shoppingList[index].sum += shoppingList[index].pricePerOne;

      displayList();
    });

    const decrementButton = li.querySelector(".btn-decrement");
    decrementButton.addEventListener("click", () => {
      const index = parseInt(decrementButton.dataset.index, 10);

      if (shoppingList[index].count > 0) {
        shoppingList[index].count -= 1;
        shoppingList[index].sum -= shoppingList[index].pricePerOne;

        displayList();
      }
    });
  }
};

displayList();

const sortList = (arr) => {
  const boughtItem = arr.filter((ob) => ob.isBought);
  const notBoughtItem = arr.filter((ob) => !ob.isBought);

  let newShoppingList = [...boughtItem, ...notBoughtItem];

  displayList(newShoppingList);
};

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
        isBought: false,
        pricePerOne: pricePerOne,
        sum: pricePerOne,
      });
    }

    displayList(shoppingList);

    sortList(shoppingList);

    console.log(sortList(shoppingList));
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

console.log(sortList(shoppingList));
