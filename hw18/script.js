// 1 Створити масив «Список покупок». Кожен елемент масиву є об'єктом, який містить
// назву продукту, кількість і куплений він чи ні, ціну за одиницю товару, сума.

const buttonAdd = document.querySelector("#addItem");
const addProduct = document.querySelector("#addProduct");
const addPrice = document.querySelector("#addPrice");
let par = document.getElementById("hideMe");

let shoppingList = [];

const displayList = (arr) => {
  const ul = document.querySelector("ul");

  ul.innerHTML = "";

  for (let item of arr) {
    let li = document.createElement("li");
    li.innerHTML = `
      <span class="font-bold">${item.productName}:</span></br>
      count: ${item.count},</br>
      price for 1 ${item.productName}: ${item.pricePerOne},</br>
      total sum: ${item.sum}</br>
      <button class="btn-delete">Delete</button>
    `;
    ul.appendChild(li);

    // const buttonDel = document.querySelector(".btn-delete");
    // buttonDel.addEventListener("click", () => {
    //   ul.removeChild(li);
    // });
  }
  ul.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("btn-delete")) {
      const index = parseInt(target.id.split("-")[2], 10);
      arr.splice(index, 1);
      displayList(arr); // Update the list after removing the item
    }
  });
};

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
    par.classList.add("hidden");

    shoppingList.push({
      productName: productName,
      count: 0,
      isBought: false,
      pricePerOne: pricePerOne,
      sum: 0,
    });

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
