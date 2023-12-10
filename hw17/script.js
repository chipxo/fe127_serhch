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

if (Object.keys(user).length !== 0 && user.hasOwnProperty("age")) {
  console.log("success");
} else {
  console.log("failed");
}

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

const findWithName = (userName) => {
  return Object.values(users).filter(({ name }) => name === userName);
};

let userNameBob = findWithName("Bob"); // Bob
console.log(userNameBob);

// 5 Видаліть із об'єктів (завдання 4) об'єкт з name == "Anna".

const deleteWithName = (userName) => {
  const usersToKeep = Object.entries(users).filter(
    ([key, user]) => user.name !== userName,
  );
  return (users = Object.fromEntries(usersToKeep));
};

deleteWithName("Anna");

console.log(users);

//  Отримайте з об'єкта obj значення id у констанду id, не використовуючи вираз obj.id
let obj = {
  id: 5,
  token: 12343423,
};

const objId = Number(Object.values(obj).filter((num) => num === 5));
console.log(objId);

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
    this.drivers = drivers;
  }

  // Метод, який виводить на екран інформацію про автомобіль.
  aboutAuto() {
    console.log(`Maker: ${this.maker}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year of Production: ${this.yearOfProduction} year`);
    console.log(`Average Speed: ${this.averageSpeed}km/h`);
    console.log(`Fuel Storage Capacity: ${this.fuelStorageCapacity}l`);
    console.log(
      `Average Fuel Consumption per 100km: ${this.averageFuelConsumptionPer100km}l`,
    );
    console.log(`Drivers: ${this.drivers.join(", ")}`);
  }

  // Додавання ім’я водія у список
  addDriver(drName) {
    this.drivers.push(drName);
  }

  // Перевірка водія на наявність його ім’я у списку
  checkDriver(drName) {
    const hasDriver = this.drivers.includes(drName);

    if (hasDriver) {
      console.log(`${drName} is on the list.`);
    } else {
      console.log(`${drName} isn't on the list.`);
    }
  }

  //  Підрахунок необхідного часу
  calcTotalTime(dist) {
    let hoursWithoutBreaks = dist / this.averageSpeed;
    let breaks = Math.floor(hoursWithoutBreaks / 4);
    let totalTime = (hoursWithoutBreaks += breaks);

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

    if (totalTime % 1 !== 0) {
      return `You need ${totalTime.toFixed(
        1,
      )}h and ${fuelConsumption}l of fuel for ${dist}km!`;
    }

    if (fuelConsumption % 1 !== 0) {
      return `You need ${totalTime}h and ${fuelConsumption.toFixed(
        1,
      )}l of fuel for ${dist}km!`;
    }

    return `You need ${totalTime}h and ${fuelConsumption}l of fuel for ${dist}km!`;
  }
}

const myCar = new Auto("BMW", "iX", 2017, 70, 200, 30, ["Jack", "Sarah"]);

console.log(myCar.aboutAuto());
myCar.addDriver("Bob");
console.log(myCar.aboutAuto());
myCar.checkDriver("Bob");
myCar.checkDriver("John");
console.log(myCar.calcTimeAndFuel(1000));
