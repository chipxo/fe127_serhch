// 1 Створіть об'єкт room з параметри:
// ключ height зі значенням 3
// ключ tv зі значенням samsung
// ключ big зі значенням true
let room = {
  height: 3,
  tv: "samsung",
  big: true,
};

// 2 Виведіть в alert тип даних параметра big
alert(typeof room.big);

// 3 Перевірте, що цей об'єкт не є порожнім і що в ньому є ключ age.
let user = {
  name: "John",
  age: 30,
};

const checkObj = (ob) => {
  return Object.keys(ob).length !== 0 && ob.hasOwnProperty("age")
    ? "success"
    : "failed";
};
checkObj(user);

// 4 Отримайте з цього об'єкту елемент, де name == "Bob" і збережіть це в будь-якій змінній.
let users = {
  user_1: {
    name: "John",
    age: 30,
  },
  user_2: {
    name: "Bob",
    age: 21,
  },
  user_3: {
    name: "Anna",
    age: 19,
  },
};

const findWithName = (ob, userName) => {
  let findObj = Object.entries(ob).filter(
    ([key, value]) => value.name === userName,
  );

  findObj = Object.fromEntries(findObj);
  return findObj;
};

let userNameBob = findWithName(users, "Bob");

// 5 Видаліть із об'єктів (завдання 4) об'єкт з name == "Anna".
const deleteWithName = (ob, userName) => {
  let usersToKeep = Object.entries(ob).filter(
    ([key, value]) => value.name !== userName,
  );

  users = Object.fromEntries(usersToKeep);
  return users;
};

deleteWithName(users, "Anna");

//  Отримайте з об'єкта obj значення id у констанду id, не використовуючи вираз obj.id
let obj = {
  id: 5,
  token: 12343423,
};

const findIdValue = ({ id }) => id;

const id = findIdValue(obj);

// 6 Створи об'єкт, що описує автомобіль (виробник, модель, рік випуску, середня швидкість, обсяг паливного баку, середня витрата палива на 100 км., водії), і наступні методи для роботи з цим об'єктом:
class Auto {
  constructor(
    maker,
    model,
    yearOfProduction,
    averageSpeed,
    fuelStorageCapacity,
    averageFuelConsumptionPer100km,
    drivers,
  ) {
    this.maker = maker;
    this.model = model;
    this.yearOfProduction = yearOfProduction;
    this.averageSpeed = averageSpeed;
    this.fuelStorageCapacity = fuelStorageCapacity;
    this.averageFuelConsumptionPer100km = averageFuelConsumptionPer100km;
    this.drivers = [drivers];
  }

  // Метод, який виводить на екран інформацію про автомобіль.
  aboutAuto() {
    return `
    Maker: ${this.maker}, 
    Model: ${this.model},
    Year of Production: ${this.yearOfProduction} year,
    Average Speed: ${this.averageSpeed}km/h,
    Fuel Storage Capacity: ${this.fuelStorageCapacity}l,
    Average Fuel Consumption/100km: ${this.averageFuelConsumptionPer100km}l,
    Drivers: ${this.drivers.join(", ")}.
    `;
  }

  // Додавання ім’я водія у список
  addDriver(drName) {
    this.drivers.push(drName);
  }

  // Перевірка водія на наявність його ім’я у списку
  checkDriver(drName) {
    let hasDriver = this.drivers.includes(drName);

    return hasDriver
      ? `${drName} is on the list.`
      : `${drName} is not on the list.`;
  }

  //  Підрахунок необхідного часу
  calcTotalTime(dist) {
    let hoursWithoutBreaks = dist / this.averageSpeed;
    let breaks = Math.floor(hoursWithoutBreaks / 4);
    let totalTime = hoursWithoutBreaks + breaks;

    return totalTime;
  }

  //  Підрахунок необхідного палива
  calcTotalFuel(dist) {
    let fullDistance = dist / 100;
    let fuel = this.averageFuelConsumptionPer100km * fullDistance;

    return fuel;
  }

  //  Підрахунок необхідного часу та кількості палива для подолання переданої відстані з середньою швидкістю. Через кожні 4 години дороги водієві необхідно робити перерву на 1 годину.
  calcTimeAndFuel(dist) {
    let totalTime = this.calcTotalTime(dist);
    let fuelConsumption = this.calcTotalFuel(dist);

    if (totalTime % 1 !== 0 && fuelConsumption % 1 !== 0) {
      return `You need ${totalTime.toFixed(1)}h and ${fuelConsumption.toFixed(
        1,
      )}l of fuel for ${dist}km!`;
    } else if (totalTime % 1 !== 0) {
      return `You need ${totalTime.toFixed(
        1,
      )}h and ${fuelConsumption}l of fuel for ${dist}km!`;
    } else if (fuelConsumption % 1 !== 0) {
      return `You need ${totalTime}h and ${fuelConsumption.toFixed(
        1,
      )}l of fuel for ${dist}km!`;
    } else {
      return `You need ${totalTime}h and ${fuelConsumption}l of fuel for ${dist}km!`;
    }
  }
}

const myCar = new Auto(
  prompt("Enter your car's mark:"),
  prompt("Enter your car's model:"),
  prompt("Enter your car's year manufacturing:"),
  prompt("Enter your car's average km/h speed:"),
  prompt("Enter your car's fuer storage capacity:"),
  prompt("Enter your car's average fuel consumption per 100km:"),
  prompt(["Enter your drivers:"]),
);

alert(myCar.aboutAuto());

myCar.addDriver(prompt("Add your driver:"));

alert(myCar.aboutAuto());

alert(myCar.checkDriver(prompt("Check driver:")));
alert(myCar.checkDriver(prompt("Check driver:")));

alert(myCar.calcTimeAndFuel(prompt("Enter your distance:")));
