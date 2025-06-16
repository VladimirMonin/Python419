// Lesson 14
//  Как пишется цикл for
let message = "Привет мир";

for (let letter of message) {
  console.log(letter);
}

if (message) {
  console.log("Переменная message существует");
}

// Тернарный оператор в JavaScript - печатаем в консоль "Переменная message существует" если переменная message существует
message
  ? console.log("Переменная message существует")
  : console.log("Переменная message не существует");

// Шаблон <утверждение> ? <если истина> : <если ложь>
// PRACTICE - проверка совершеннолетия через тернарный оператор
let age = prompt("Сколько вам лет?");
const adultAge = 18;
// Шаблон <утверждение> ? <если истина> : <если ложь>
let checkResult =
  age >= adultAge ? "Вы совершеннолетний" : "Вы несовершеннолетний";

console.log(checkResult);
alert(`Результат проверки: ${checkResult}`);

// 3 способа объявить функцию
// 1. Function Declaration - функция будет доступна до её объявления в области видимости (модуль или глобальная область)
// 2. Function Expression - функция будет доступна только после её объявления
// 3. Стрелочная функция - будет доступна только после её объявления - однострочная функция

// 1. Function Declaration
function getSum(a, b) {
  return a + b;
}

// 2. Function Expression - могут не иметь имени - и объявляться просто через function() {
const getSum2 = function (a, b) {
  return a + b;
};

// 3. Стрелочная функция - однострочная функция - если в теле функции одна строка, то можно не писать фигурные скобки и return
const getSum3 = (a, b) => a + b;

let potatos = [
  "картошка",
  "гнилая картошка",
  "картошка",
  "картошка",
  "гнилая картошка",
];

// Как бы в пайтон это можно было обработать?
// clean_potatos = [potato + "_почищенная" for potato in potatos if potato != "гнилая картошка"]

let clean_potatos = [];
let limit = 2;

// for (let potato of potatos) {
//   if (clean_potatos.length >= limit) {
//     break;
//   }

//   if (potato != "гнилая картошка") {
//     clean_potatos.push(potato + "_почищенная");
//   }
// }

// Альтернативный вариант с forEach
potatos.forEach((potato) => {
  console.log(potato);
}); // Альтернативный вариант с forEach (~= for potato in potatos: print(potato) в pytho
// PRACTICE - набрать этот код с forEach
potatos.forEach((potato) => {
  if (potato != "гнилая картошка") {
    clean_potatos.push(potato + "_почищенная");
  }
});

console.log(clean_potatos);

// Напишем собственный MAP

function myMap(array, callback) {
  let result = [];
  for (let item of array) {
    let itemProcessed = callback(item);
    result.push(itemProcessed);
  }
  return result;
}

// PRACTICE - набрать этот код с myMap
let books = ["Властелин колец", "Гарри Поттер и философский камень", "1984"];

// Теперь мы можем применить функцию высшего порядка myMap к массиву books
// Для этого нам надо будет либо создать функцию callback, либо использовать однострочные варианты.

// 1. Создадим функцию callback
function readBook(book) {
  return book + "_прочитанная";
}

let readBooks = myMap(books, readBook);

// 2. Используем однострочные варианты - function expression

let readBooks2 = myMap(books, function (book) {
  return book + "_прочитанная";
});

// 3. Для коротких вариантов вроде нашего, отлично подойдет стрелочная функция
let readBooks3 = myMap(books, (book) => book + "_прочитанная");

function myFilter(array, callback) {
  let result = [];

  for (let item of array) {
    if (callback(item)) {
      result.push(item);
    }
  }
  return result;
}

let potatos2 = [
  "картошка",
  "гнилая картошка",
  "картошка",
  "картошка",
  "гнилая картошка",
];

// Отфильтруем картошку
let goodPotatoes = myFilter(potatos2, (potato) => !potato.includes("гнилая"));
console.log(goodPotatoes);

// Встроенные функции и методы принимают функции в качестве аргументов
// map - применяет функцию к каждому элементу массива - возвращает новый массив
// filter - фильтрует элементы массива по условию - возвращает новый массив
// forEach - применяет функцию к каждому элементу массива - не возвращает новый массив
// reduce - применяет функцию к каждому элементу массива - возвращает одно значение

// Попробуем фильтр из JS

let goodPotatoes2 = potatos2.filter((potato) => !potato.includes("гнилая"));

// PRACTICE: фильтр подарков

const gifts = [
  { name: "Книга", price: 2000 },
  { name: "Наушники", price: 10000 },
  { name: "Песня", price: 0 },
  { name: "Айфон 16 Pro Max", price: 110000 },
  { name: "Афонь 17 Pro Mux", price: 25000 },
];

// Отфильтруем подарки дешевле 20000
let filteredGifts = gifts.filter((gift) => gift.price < 20000);
console.log(filteredGifts);

// Самовызывающие функции (IIFE)
// I - Immediately
//  I - Invoked
//  F - Function
//  E - Expression

const movieDiary = (function () {
  const privateRatings = []; // Скрытые данные

  return {
    addRating: (movie, rating) => {
      privateRatings.push({ movie, rating });
      alert(`Оценка для "${movie}" сохранена!`);
    },
    getAverage: () => {
      const total = privateRatings.reduce((sum, item) => sum + item.rating, 0);
      return total / privateRatings.length;
    },
  };
})();

// Использование
movieDiary.addRating("Интерстеллар", 9);
movieDiary.addRating("Начало", 8);
alert(`Средний балл: ${movieDiary.getAverage()}`); // 8.5

function createCouponGenerator(prefix) {
  let count = 0; // Замкнутая переменная

  return function () {
    count++;
    return `${prefix}${count}`;
  };
}

// Создаем генераторы
const giftGenerator = createCouponGenerator("GIFT-");
const movieGenerator = createCouponGenerator("CINEMA-");

// Используем
alert(`Ваш купон: ${giftGenerator()}`); // GIFT-1
alert(`Ваш купон: ${movieGenerator()}`); // CINEMA-1
alert(`Следующий: ${giftGenerator()}`); // GIFT-2

// Функция с кешированием
function anekdotGenerator() {
  let cachedAnedot;
  let lastTheme;

  return function (theme) {
    if (theme === lastTheme) {
      if (cachedAnedot) {
        return cachedAnedot;
      } else {
        cachedAnedot = `Анекдот на тему ${theme}`;
        lastTheme = theme;
        return cachedAnedot;
      }
    } else {
      cachedAnedot = `Анекдот на тему ${theme}`;
      lastTheme = theme;
      return cachedAnedot;
    }
  };
}

// Использование

const getAnekdot = anekdotGenerator()


alert(getAnekdot("Котики"))
alert(getAnekdot("Котики"))

alert(getAnekdot("Слоники"))