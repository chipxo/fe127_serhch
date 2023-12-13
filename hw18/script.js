// 1 Створити масив «Список покупок». Кожен елемент масиву є об'єктом, який містить
// назву продукту, кількість і куплений він чи ні, ціну за одиницю товару, сума.

const buttonAdd = document.querySelector("#addItem");
const addProduct = document.querySelector("#addProduct");
const addPrice = document.querySelector("#addPrice");
let par = document.getElementById("hideMe");

let shoppingList = [];

// const displayList = () => {
//   const ul = document.querySelector("ul");

//   ul.innerHTML = "";

//   for (let i = 0; i < shoppingList.length; i++) {
//     const item = shoppingList[i];
//     const li = document.createElement("li");

//     li.innerHTML = `
//       <span class="font-bold">${item.productName}:</span></br>
//       count: ${item.count},</br>
//       price for 1 ${item.productName}: ${item.pricePerOne},</br>
//       total sum: ${item.sum}</br>
//       <button class="btn-delete" data-index="${i}">Delete</button>
//     `;

//     ul.appendChild(li);
//   }

//   // for (let item of arr) {
//   //   let li = document.createElement("li");
//   //   li.innerHTML = `
//   //     <span class="font-bold">${item.productName}:</span></br>
//   //     count: ${item.count},</br>
//   //     price for 1 ${item.productName}: ${item.pricePerOne},</br>
//   //     total sum: ${item.sum}</br>
//   //     <button class="btn-delete" data-index="0">Delete</button>
//   //   `;
//   //   ul.appendChild(li);
//   // }

//   const deleteButtons = document.querySelectorAll(".btn-delete");

//   deleteButtons.forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const index = parseInt(event.target.dataset.index, 10);

//       // Remove the item at the specified index
//       shoppingList.splice(index, 1);

//       // Update the displayed list
//       displayList();
//       });
//   });

// ul.addEventListener("click", (event) => {
//   const target = event.target;

//   if (target.classList.contains("btn-delete")) {
//     // Handle delete button click
//     const index = parseInt(target.dataset.index, 10);

//     // Remove the item at the specified index
//     shoppingList.splice(index, 1);

//     // Update the displayed list
//     displayList();
//   }
// });

// const displayList = () => {
//   const ul = document.querySelector("ul");
//   ul.innerHTML = "";

//   shoppingList.forEach((item, index) => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <span class="font-bold">${item.productName}:</span></br>
//       count: ${item.count},</br>
//       price for 1 ${item.productName}: ${item.pricePerOne},</br>
//       total sum: ${item.sum}</br>
//       <button class="btn-delete" data-index="${index}">Delete</button>
//     `;
//     ul.appendChild(li);
//   });

//   const deleteButtons = document.querySelectorAll(".btn-delete");

//   deleteButtons.forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const index = parseInt(event.target.dataset.index, 10);

//       // Remove the item at the specified index
//       shoppingList.splice(index, 1);

//       // Update the displayed list
//       displayList();
//     });
//   });
// };

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

      // Remove the item at the specified index
      shoppingList.splice(index, 1);

      // Update the displayed list
      displayList();
    });

    const incrementButton = li.querySelector(".btn-increment");
    incrementButton.addEventListener("click", () => {
      const index = parseInt(incrementButton.dataset.index, 10);

      // Increment the count when the increment button is clicked
      shoppingList[index].count += 1;
      shoppingList[index].sum += shoppingList[index].pricePerOne;

      // Update the displayed list
      displayList();
    });

    const decrementButton = li.querySelector(".btn-decrement");
    decrementButton.addEventListener("click", () => {
      const index = parseInt(decrementButton.dataset.index, 10);

      // Decrement the count and update the sum when the decrement button is clicked
      if (shoppingList[index].count > 0) {
        shoppingList[index].count -= 1;
        shoppingList[index].sum -= shoppingList[index].pricePerOne;

        // Update the displayed list
        displayList();
      }
    });
  }

  // const incrementButtons = document.querySelectorAll(".btn-increment");

  // incrementButtons.forEach((button) => {
  //   button.addEventListener("click", (event) => {
  //     const index = parseInt(event.target.dataset.index, 10);

  //     // Increment the count when the increment button is clicked
  //     shoppingList[index].count += 1;
  //     shoppingList[index].sum += shoppingList[index].pricePerOne;

  //     // Update the displayed list
  //     displayList();
  //   });
  // });

  // ul.addEventListener("click", (event) => {
  //   const target = event.target;

  //   if (target.classList.contains("btn-delete")) {
  //     const index = parseInt(target.dataset.index, 10);

  //     // Remove the item at the specified index
  //     shoppingList.splice(index, 1);

  //     // Update the displayed list
  //     displayList();
  //   }
  // });
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
    // Check if the product already exists in the shoppingList
    const existingProductIndex = shoppingList.findIndex(
      (item) => item.productName === productName,
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, increment the count
      shoppingList[existingProductIndex].count += 1;
      shoppingList[existingProductIndex].sum += pricePerOne; // Assuming you want to update the total sum as well
    } else {
      // If the product doesn't exist, add a new item
      shoppingList.push({
        productName: productName,
        count: 1,
        isBought: false,
        pricePerOne: pricePerOne,
        sum: pricePerOne, // Initialize the sum with the price for the first count
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
