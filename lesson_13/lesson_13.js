// Lesson 13. Циклы в JS
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
messageArr = ["Первое", "Слово", "Украла", "Сова"];

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
  newIndex++
  console.log(newIndex)
}
