// Lesson 13. Циклы в JS
import { testVar } from './test.js';
// Классический вариант цикла for (с ES6+)
let message = "Изучаем цикл FOR!";
// for of перебирает элементы
for (let char of message) {
  console.log(char);
}

// for in перебирает индексы
for (let char in message) {
  console.log(`Индекс ${char} - ${message[char]}`);
}

// Цикл for (до ES6)
// Состоит из 3х частей. 1. Переменная. 2. Условие. 3. Изменение переменной
for (let index = 0; index < 10; index++) {
  console.log(index);
}

// ++ - инкремент (увеличение на 1)
// -- - декремент (уменьшение на 1)

// Старый for для перебора message

for (let index = 0; index < message.length; index++) {
  console.log(message[index]);
}

// Обратный перебор
for (let index = message.length - 1; index >= 0; index--) {
  console.log(message[index]);
}

// Строки - неизменяемые, упорядоченные итерируемые коллекции символов
// string.length - длина строки
// string[index] - доступ к символу по индексу
// Нумерация начинается с 0
// string[index] = 'a' - не работает, строки неизменяемые

// Все три части "классического цикла можно вынести наружу"

let startIndex = 0;

for (;;) {
  console.log(message[startIndex]);
  startIndex++;
  if (startIndex === message.length) {
    break;
  }
}

// Array - упорядоченная изменяемая коллекция элементов
let messageArr = ["Первое", "Слово", "Украла", "Сова"];

for (let word of messageArr) {
  console.log(`Слово: ${word}`);
  //   Открываем вложенный цикл по буквам
  for (let letter of word) {
    console.log(`Буква: ${letter}`);
  }
}

// Классическая "кортавая" задачка. Ищем слова с буквой Р
let wordArray = ["Банан", "Апельсин", "Яблоко", "Груша", "Бронетранспортер"];
let badLetter = "р";

// Вариант 1. Цикл в цикле
for (let word of wordArray) {
  for (let letter of word) {
    if (letter === badLetter) {
      console.log(`Слово с буквой ${badLetter}: ${word}`);
      break;
    }
  }
}

// Второй вариант. Методы строки toLowerCase() - нижний регистр, includes() - проверка на вхождение
for (let word of wordArray) {
  if (word.toLowerCase().includes(badLetter)) {
    console.log(`Слово с буквой ${badLetter}: ${word}`);
  } else {
    console.log(`Слово без буквы ${badLetter}: ${word}`);
    continue;
  }
}

// Основные свойства и методы строк:
// length - длина строки
// charAt(index) - символ по указанному индексу
// concat(str) - объединение строк
// includes(substr) - проверка на вхождение подстроки
// indexOf(substr) - индекс первого вхождения подстроки
// lastIndexOf(substr) - индекс последнего вхождения подстроки
// replace(old, new) - замена подстроки
// slice(start, end) - извлечение части строки
// split(separator) - разделение строки на массив
// substring(start, end) - извлечение части строки
// toLowerCase() - преобразование в нижний регистр
// toUpperCase() - преобразование в верхний регистр
// trim() - удаление пробелов с обоих концов
// startsWith(str) - проверка начала строки
// endsWith(str) - проверка конца строки
// repeat(count) - повторение строки

// While - цикл с предусловием

// Бесконечный цикл положит браузер
// while (true) {
//     console.log("Купи слона!")
// }

let newIndex = 0;
while (newIndex < 10) {
  newIndex++;
  console.log(newIndex);
}

// Цикл с постусловием - do while

do {
  console.log("Купи слона!");
} while (false);

////////////////// ФУНКЦИИ И ОБЛАСТИ ВИДИМОСТИ

// Области видимости в JS:
// 1. Global - переменные объявленные вне функций/блоков
//    Доступны везде в коде.
console.log(testVar); // Работает - она объявлена в другом файле (подключен ДО этого файла в HTML)

// 2. Function - переменные объявленные внутри функции
//    Доступны только внутри функции
function testFunc() {
  let funcVar = "Я функциональная";
  console.log(funcVar); // Работает
}
// console.log(funcVar); // Ошибка - funcVar не определена

// 3. Block - переменные объявленные в блоках {} с let/const
//    Доступны только внутри блока
if (true) {
  let blockVar = "Я блочная";
  console.log(blockVar); // Работает
}
// console.log(blockVar); // Ошибка - blockVar не определена

// 4. Module - переменные в модулях ES6
//    Доступны только внутри модуля если не экспортированы
// Пример с модулями (нужно изменить подключение в HTML):
// test.js:
// export let moduleVar = "Я модульная переменная";
//
// lesson_13.js:
// import { moduleVar } from './test.js';
// console.log(moduleVar); // Работает только при модульном подключении
//
// Обычные скрипты (как сейчас) - все переменные попадают в глобальную область
// Модули ES6 - изолированная область видимости, нужен явный экспорт/импорт

// СПОСОБЫ ОБЪЯВИТЬ ФУНКЦИЮ В JS
// 1. Function Declaration - объявление функции
// sayHello() // Вызов функции до её объявления - Функции, объявленные таким способом, "поднимаются" (hoisted) в начало своей области видимости.

function sayHello() {
  console.log("Hello!");
}

// Функциональное выражение (Function Expression) - объявление функции через переменную
// sayHi() // Ошибка - sayHi не определена (функции не "поднимаются")
// Могут не ложиться в переменную - тогда это будет анонимная функция
let sayHi = function () {
  console.log("Hi!");
};

// Стрелочные функции (Arrow Functions) - более короткий синтаксис
let sayHey = () => console.log("Hey!");

// Фигурные скобки можно не использовать если выражение в одну строку!
// Если выражение в несколько строк - то фигурные скобки нужны!

// Функции с аргументами!

function sayMessage(message) {
  return `Message: ${message}`;
}

// Функция принемает слово, и плохую букву и возвращает Bool
function checkBadLetter(word, letter) {
  return word.includes(letter);
}

let wordArray2 = ["Банан", "Апельсин", "Яблоко", "Груша", "Бронетранспортер"];

// // Перебор массива и проверка на плохую букву
// for (let word of wordArray2) {
//   if (checkBadLetter(word, "р")) {
//     console.log(word);
//   }
// }

// // Вариант 2 - map применим функцию checkBadLetter к каждому элементу массива

// wordArray2.map((word) => {
//     if (word.includes("р")) {
//         console.log(word);
//         return word.toUpperCase();
//         } else {
//             return word;
//             }
// })

// // Вариант 3 - forEach применим функцию checkBadLetter к каждому элементу массива

// wordArray2.forEach((word) => {
//   if (word.includes("р")) {
//     console.log(word);
//   }
// });

// Разница между MAP и FOREACH
// MAP возвращает новый массив, FOREACH нет

let newArray1 = wordArray2.map((word) => { return word.toUpperCase()}); // map - возвращает данные
let newArray2 = wordArray2.forEach((word) => {return word.toLowerCase()}); // forEach - не возвращает данные


console.log(newArray1);console.log(newArray2); // Один будет массив, другой undefined - forEach не возвращает данные!


// Аргументы по умолчанию

function greetByName(greet="Привет", name) {
    return `${greet}, ${name}!`;
}

console.log(greetByName("Вася")); // Привет, Вася!
console.log(greetByName("Вася", "Здравствуйте")); // Здравствуйте, Вася!

// Оно работает, хоть и достаточно странно. Если не передать аргумент, то он будет undefined внутри, что может поломать логику.

// ... - rest оператор - собирает все аргументы в массив

function sayMyNames(...names) {
    return names;
}


console.log(sayMyNames("Человек Паук", "Добродушный сосед", "Странный фотограф"))

let namesArr = ["Человек Паук", "Добродушный сосед", "Странный фотограф"]

console.log(sayMyNames(...namesArr)) // ... - spread оператор - разворачивает массив в аргументы


// 1. `push()` - добавление элемента в конец
// 2. `pop()` - удаление последнего элемента
// 3. `shift()` - удаление первого элемента
// 4. `unshift()` - добавление элемента в начало
// 5. `map()` - преобразование каждого элемента
// 6. `filter()` - фильтрация по условию
// 7. `forEach()` - итерация по элементам
// 8. `find()` - поиск первого совпадения
// 9. `includes()` - проверка наличия элемента
// 10. `indexOf()` - поиск индекса элемента
// 11. `slice()` - копирование части массива
// 12. `splice()` - изменение массива (удаление/вставка)
// 13. `concat()` - объединение массивов

// #### 🟡 Средняя популярность (продвинутые операции):

// 1. `reduce()` - аккумуляция значений
// 2. `some()` - проверка хотя бы одного совпадения
// 3. `every()` - проверка всех элементов
// 4. `findIndex()` - поиск индекса по условию
// 5. `sort()` - сортировка элементов
// 6. `reverse()` - обратный порядок элементов
// 7. `join()` - объединение в строку
// 8. `flat()` - выравнивание вложенных массивов
// 9. `flatMap()` - map + flat за одну операцию

// #### 🔴 Низкая популярность (специализированные):

// 1. `copyWithin()` - копирование внутри массива
// 2. `fill()` - заполнение массива значением
// 3. `entries()` - итератор ключ/значение
// 4. `keys()` - итератор ключей
// 5. `values()` - итератор значений
// 6. `reduceRight()` - reduce справа налево
// 7. `lastIndexOf()` - поиск с конца массива


// SyntaxError: The requested module ... doesn't provide an export named 'greetByName'\
// В practice.js выполняется импорт:

// ```js
// import { greetByName } from './lesson_13.js';
// ```

// но в lesson_13.js функция `greetByName` объявлена, __но не экспортирована__.\
// Модуль может отдавать наружу только то, что явно помечено как `export`.

// Возможные варианты исправления в lesson_13.js:

// ```js
// // сразу при объявлении
// export function greetByName(greet = "Привет", name) {
//   return `${greet}, ${name}!`;
// }

// // либо в конце файла
// // function greetByName(...) { ... }
// // ...
export { greetByName };
// ```
