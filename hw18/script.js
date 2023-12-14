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
  const boughtItem = arr.filter((ob) => ob.isBought);
  const notBoughtItem = arr.filter((ob) => !ob.isBought);

  let newShoppingList = [...boughtItem, ...notBoughtItem];

  return newShoppingList;
};

sortList(newShoppingList);
