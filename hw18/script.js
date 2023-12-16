const buttonAdd = document.querySelector("#addItem");
const addProduct = document.querySelector("#addProduct");
const addPrice = document.querySelector("#addPrice");
let heading = document.querySelector("#heading");

let shoppingList = [];

const displayList = () => {
  const ul = document.querySelector("ul");

  ul.innerHTML = "";

  if (shoppingList.length === 0) {
    heading.textContent = "Make your shopping list";
  } else {
    heading.textContent = "Your list";
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

// Новий список покупок, виводити на екран спочатку куплені, а потім ні
let newShoppingList = [
  {
    productName: "Bread",
    count: 1,
    isBought: true,
    pricePerOne: 20,
    sum: 20,
  },
  {
    productName: "Meat",
    count: 0,
    isBought: false,
    pricePerOne: 100,
    sum: 0,
  },
  {
    productName: "Eggs",
    count: 1,
    isBought: true,
    pricePerOne: 50,
    sum: 50,
  },
  {
    productName: "Milk",
    count: 0,
    isBought: false,
    pricePerOne: 30,
    sum: 0,
  },
];

const sortList = (arr) => {
  const sortedShoppingList = arr
    .sort((a, b) => b.isBought - a.isBought)
    .map(({ productName }) => productName);

  return sortedShoppingList.join(", ");
};

alert(sortList(newShoppingList));
