const user = {
  name: "Алиса",
  age: 30,
  isAdmin: true,
};

console.log(typeof [] === "object"); // true
console.log(typeof {} === "object"); // true

// Чтобы определить является ли переменная массивом, нужно использовать метод Array.isArray()
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false

console.log(typeof {}); // Вывод: object
console.log(typeof []); // Вывод: object
console.log(typeof function () {}); // Вывод: function (но функции - это тоже объекты)
console.log(typeof "hello"); // Вывод: string (примитив)
console.log(typeof 123); // Вывод: number (примитив)
console.log(typeof null); // Вывод: object (историческая ошибка)

// Пример, как примитивы ведут себя как объекты
const str = "Hello";
console.log(str.toUpperCase()); // Вывод: HELLO (строка временно обернута в объект String)

// TODO - Копия объекта

const mySymbol = Symbol("id");
const mySymbol2 = Symbol("id");
const obj = {
  name: "Иван",
  10: "десять", // Число 10 будет преобразовано в строку "10"
  [mySymbol]: "уникальный идентификатор", // Символ как ключ
  [mySymbol2]: "уникальный идентификатор 2", // Символьный ключ
};

console.log(mySymbol === mySymbol2); // false
// Добудем данные по символьному ключу
console.log(obj[mySymbol]); // "уникальный идентификатор"
console.log(obj[mySymbol2]); // "уникальный идентификатор 2"
console.log(obj);

// Описание символа, передаваемое в Symbol('id'), служит исключительно для отладки и удобства чтения в консоли. Оно хранится в свойстве .description самого символа, но не влияет на его уникальность.

// Добудем описание символа
console.log(mySymbol.description); // "id"

// PRACTICE - Попробуйте создать объект с символьным ключом и получить данные по нему
// Создать объект
// Создать символьный ключ в нем
// Добыть данные по ключу
// Добыть описание символьного ключа

// Пример добавления удаления свойств объекта

const toyotaCar = {
  model: "Prius",
  year: 2020,
  color: "red",
};

// Добавим свойство
toyotaCar.price = 20000;

// У Удалим свойство
delete toyotaCar.year;

// Обновим год
toyotaCar.color = "blue";

// Проверка наличия свойства в объекте
console.log("year" in toyotaCar); // false
console.log("model" in toyotaCar); // true

// Пример 2: Создание объекта из массива пар [ключ, значение]
const arr2 = [
  ["name", "Алиса"],
  ["age", 30],
];
const obj2 = Object.fromEntries(arr2);
console.log(obj2); // Вывод: { name: 'Алиса', age: 30 }

const arr3 = ["apple", "banana"];
const obj3 = {};
arr3.forEach((item) => {
  obj3[item] = item.length;
});
console.log(obj3); // Вывод: { apple: 5, banana: 6 }

// Так же но с Symbol
const arr4 = ["apple", "banana"];
const obj4 = {};

arr4.forEach((item) => {
  const symbol = Symbol(item);
  obj4[symbol] = item;
});

console.log(obj4); // Вывод: { [Symbol(apple)]: 'apple', [Symbol(banana)]: 'banana' }

// Обратите внимание на особенности:

// Символьные ключи не перечисляются в for...in и не попадают в результат JSON.stringify().
// Чтобы получить массив символов-ключей, используйте Object.getOwnPropertySymbols(obj4).
// Это удобно для «приватных» или уникальных свойств без риска коллизий, но усложняет отладку и сериализацию.
// Если вам нужны именно уникальные и скрытые от обычной итерации свойства – этот приём уместен. Для простого отображения массива в объект строковые ключи могут быть более привычным вариантом.

// PRACTICE - Преобразование массива в объект
// Создать объект - где ключ это слово из массива, а значение Boolean - есть ли буква р в слове через стрелку проверить методом includes
let wordsArr = [
  "Танк",
  "Бронетранспортер",
  "Артиллерия",
  "Ракета",
  "Самолет",
  "Вертолет",
];

// Решение
const wordsObj = {};

wordsArr.forEach((word) => {
  wordsObj[word] = word.toLowerCase().includes("р");
});

console.log(wordsObj);

// keys - возвращает массив ключей объекта
// values - возвращает массив значений объекта
// entries - возвращает массив пар [ключ, значение]

console.log(Object.keys(wordsObj));
console.log(Object.values(wordsObj));
console.log(Object.entries(wordsObj));

// console.log(wordsObj.items()) // Так нельзя

// Итерация по объекту
// 1. for...in
// 2. Object.keys(obj)
// 3. Object.values(obj)
// 4. Object.entries(obj)

// 1. for...in
for (let key in wordsObj) {
  console.log(`Ключ: ${key}, Содержание буквы "р": ${wordsObj[key]}`);
}

// 2. Object.keys(obj)
for (let key of Object.keys(wordsObj)) {
  console.log(`Ключ: ${key}, Содержание буквы "р": ${wordsObj[key]}`);
}

// 3. Object.values(obj)
for (let key of Object.values(wordsObj)) {
  console.log(`Содержание буквы "р": ${key}`);
}

// 4. Object.entries(obj)
for (let [key, value] of Object.entries(wordsObj)) {
  console.log(`Ключ: ${key}, Содержание буквы "р": ${value}`);
}

// PRACTICE - Попробуйте обойти ключ + значение объекта через forEach
// для этого потребуется
// 1. Вызов метода entries()
// 2. Перебор массива через forEach
// 3. Вывод в консоль через стрелочную функцию ключ и значечние (ключ и значение в квадратных скобках)

let wordsObj2 = {
  Танк: false,
  Бронетранспортер: true,
  Артиллерия: true,
  Ракета: true,
  Самолет: false,
  Вертолет: true,
};

// ООП - С старым синтаксисом (ДО ES6 где появился class)
// 1. Создать конструктор (или как это называют в JS - функция конструктор)
function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
  this.getInfo = function () {
    return `Автомобиль ${this.brand} ${this.model} ${this.year} года выпуска`;
  };
}
// 2. Создать экземпляр класса
const car1 = new Car("Toyota", "Camry", 2020);
const car2 = new Car("Honda", "Civic", 2019);

console.log(car1.getInfo()); // Toyota Camry 2020

// this - это ссылка на текущий объект
// Так же это слово используется в функциях - что будет ссылаться на текущий контекст выполнения

// ООП - С новым синтаксисом (ПОСЛЕ ES6)
// 1. Создать класс
class Car2 {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;

    // Методы
    this.getInfo = function () {
      return `Автомобиль ${this.brand} ${this.model} ${this.year} года выпуска`;
    };
  }
}

// 2. Создать экземпляр класса
const car3 = new Car2("Toyota", "Camry", 2020);
const car4 = new Car2("Honda", "Civic", 2019);

console.log(car3.getInfo()); // Toyota Camry 2020

/////////////////////// ДЕСТРУКТУРИЗАЦИЯ ///////////////////////

let wordsArr3 = [
  "Танк",
  "Бронетранспортер",
  "Артиллерия",
  "Ракета",
  "Самолет",
  "Вертолет",
];
let wordsObj3 = {
  Танк: false,
  Бронетранспортер: true,
  Артиллерия: true,
  Ракета: true,
  Самолет: false,
  Вертолет: true,
};

// Деструктуризация - это процесс извлечения значений из массива или объекта и присвоения их переменным.

// Деструктуризация массива
let [a, b, c] = wordsArr3;

// Она происходит как раз в цикле по entries
for (let [key, value] of Object.entries(wordsObj3)) {
  console.log(`Ключ: ${key}, Содержание буквы "р": ${value}`);
}

// Не обязательно должны быть все переменные
let [a2, b2] = wordsArr3;

// Первые два + массив остальных
// ... - это называется rest оператор
let [a3, b3, ...rest] = wordsArr3;
console.log(a2, b2, rest);

// rest используется в аргументах функции
function sum(...args) {
  //   args  - это массив
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}

// Как можно передать массив в такую функцию используя rest
let numArr = [1, 2, 3, 4, 5];
// ... - это называется spread оператор
console.log(sum(...numArr));

// Можно использовать и в объектах

// Деструктуризация объекта
let { Танк, Бронетранспортер } = wordsObj3;
console.log(Танк, Бронетранспортер);

//  PRACTICE - Создать класс пользователя с полями и методами класса
// 1. Создать класс User
// 2. Описать поля (минимум 3 поля)
// 3. Описать методы (минимум 2 метода) - один метод пусть выдает консоль лог

class User {
  constructor(name, age, email, ...hobbies) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.hobbies = hobbies;

    this.getHobbiesString = function () {
      return this.hobbies.join(", ");
    };

    this.getUserInfo = function () {
      return `Имя: ${this.name}, Возраст: ${this.age}, Email: ${
        this.email
      }, Хобби: ${this.getHobbiesString()}`;
    };
  }
}

const user1 = new User(
  "Иван",
  30,
  "ivan@example.com",
  "Чтение",
  "Программирование"
);

const userInfo2 = {
  name: "Мария",
  age: 25,
  email: "maria@example.com",
  hobbies: ["Музыка", "Спорт"],
};

const user2 = new User(
  userInfo2.name,
  userInfo2.age,
  userInfo2.email,
  ...userInfo2.hobbies
);

console.log(user1.getUserInfo()); // Имя: Иван, Возраст: 30, Email: ivan@example.com, Хобби: Чтение, Программирование
console.log(user2.getUserInfo()); // Имя: Мария, Возраст: 25, Email: maria@example.com, Хобби: Музыка, Спорт

// JSON - JavaScript Object Notation - это формат обмена данными
// ЭТО ОДИН объект. Это важно. Как правило это либо массив либо объект
// Правила оформления JSON:
// 1. Ключи объекта должны быть в двойных кавычках
// 2. В конце не должно быть запятая
// 3. В JSON нет комментариев
// 5. В JSON null, true и false есть, но не undefined







// https://api.openweathermap.org/data/2.5/weather?q=ВАШ_ГОРОД&appid=23496c2a58b99648af590ee8a29c5348&units=metric&lang=ru

let weatherResponse = {
  coord: { lon: 82.6103, lat: 49.9789 },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "облачно с прояснениями",
      icon: "04n",
    },
  ],
  base: "stations",
  main: {
    temp: 20.96,
    feels_like: 21.28,
    temp_min: 20.96,
    temp_max: 20.96,
    pressure: 1003,
    humidity: 83,
    sea_level: 1003,
    grnd_level: 963,
  },
  visibility: 10000,
  wind: { speed: 2, deg: 230 },
  clouds: { all: 75 },
  dt: 1750701954,
  sys: {
    type: 1,
    id: 8831,
    country: "KZ",
    sunrise: 1750630847,
    sunset: 1750689755,
  },
  timezone: 18000,
  id: 1520316,
  name: "Усть-Каменогорск",
  cod: 200,
};

// 1. Название города weatherResponse.name
// 2. Температура weatherResponse.main.temp
// 3. Ощущается как weatherResponse.main.feels_like
// 4. Описание на русском weatherResponse.weather[0].description
// 5. Скорость ветра weatherResponse.wind.speed

// class WeatherInfo {
//     constructor(weatherResponse) {
//         this.city = weatherResponse.name;
//         ..........
// }

