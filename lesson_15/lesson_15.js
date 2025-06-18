// Lesson 15. Строки. Массивы. Объекты. Методы...

// Строки. Упорядоченные, не изменяемые коллекции символов.

// Основные свойства и методы строк:
// .length - длина строки
// .toUpperCase() - возвращает строку в верхнем регистре
// .toLowerCase() - возвращает строку в нижнем регистре
// .replace(searchValue, replaceValue) - заменяет первое вхождение подстроки на replaceValue
// .replaceAll(searchValue, replaceValue) - заменяет все вхождения подстроки на replaceValue
// .charAt(index) - возвращает символ по индексу
// .indexOf(str) - возвращает индекс первого вхождения подстроки
// .lastIndexOf(str) - возвращает индекс последнего вхождения подстроки
// .slice(start, end) - возвращает подстроку от start до end
// .substring(start, end) - возвращает подстроку от start до end
// .substr(start, length) - возвращает подстроку от start длиной length

let someString = "Карл у Клары украл кораллы";

console.log(someString.length); // Получаем  длину строки
let newSomeString = someString
  .replace("Карл", "Клара")
  .replace("кораллы", "бананы")
  .replace("Клары", "Карла");

// Создадим наследника body - p и поместим текст в него
let body = document.querySelector("body");
let p = document.createElement("p");
p.textContent = newSomeString;
body.append(p);

console.log(newSomeString);

// Сделаем срез новой строки
let sliceNewString = newSomeString.slice(0, 13);

console.log(sliceNewString);

//PRACTICE - Функция. Проверка на палиндром
let wordForCheck = "А роза упала на лапу Азора";
let rawWordForCheck = wordForCheck.toLowerCase().replaceAll(" ", "");
let reversedwordForCheck = rawWordForCheck.split("").reverse().join("");

if (rawWordForCheck === reversedwordForCheck) {
  console.log(`${wordForCheck} - палиндром`);
} else {
  console.log(`${wordForCheck} - не палиндром`);
}

function isPalindrome(wordForCheck) {
  let rawWordForCheck = wordForCheck.toLowerCase().replaceAll(" ", "");
  let reversedwordForCheck = rawWordForCheck.split("").reverse().join("");

  if (rawWordForCheck === reversedwordForCheck) {
    console.log(`${wordForCheck} - палиндром`);
    return true;
  } else {
    console.log(`${wordForCheck} - не палиндром`);
    return false;
  }
}

function isPalindrome2(wordForCheck) {
  let rawWordForCheck = wordForCheck.toLowerCase().replaceAll(" ", "");
  let reversedwordForCheck = rawWordForCheck.split("").reverse().join("");

  return rawWordForCheck === reversedwordForCheck;
}

let userPrompt = prompt("Введите слово");
console.log(`${userPrompt} - ${isPalindrome2(userPrompt)}`);

console.log(userPrompt[0]);
// userPrompt[0] = "b"; // Uncaught TypeError: 0 is read-only

// Массивы. Упорядоченные, изменяемые коллекции элементов.

// Основные свойства и методы массивов:
// .length - длина массива
// .push(element) - добавляет элемент в конец масси
// .includes(element) - возвращает true, если элемент есть в массиве
// .reverse() - разворачивает массив
// .pop() - удаляет элемент из конца массива
// .shift() - удаляет элемент из начала массива
// .unshift(element) - добавляет элемент в начало массива
// .splice(index, deleteCount, element1, element2, ...) - удаляет элементы из массива
// .slice(start, end) - возвращает подмассив от start до end
// .concat(array1, array2, ...) - возвращает новый массив, состоящий из массива, на котором был вызван метод, и переданных аргументов
// .join - возвращает строку, состоящую из элементов массива, разделенных заданным разделителем
// .split - возвращает массив, состоящий из строки, разделенной заданным разделителем

// .forEach - перебирает элементы массива
// .map - перебирает элементы массива и возвращает новый массив
// .filter - перебирает элементы массива и возвращает новый массив, состоящий из элементов, удовлетворяющих условию
// .some - перебирает элементы массива и возвращает true, если хотя бы один элемент удовлетворяет условию
// .every - перебирает элементы массива и возвращает true, если все элементы удовлетворяют условию
// .find - перебирает элементы массива и возвращает первый элемент, удовлетворяющий условию
// .findIndex - перебирает элементы массива и возвращает индекс первого элемента, удовлетворяющего условию
// .sort - сортирует элементы массива
// .reduce - перебирает элементы массива и возвращает результат выполнения функции

let palindromesArray = [
  "А роза упала на лапу Азора",
  "Аргентина манит негра",
  "Я иду с мечем судия",
  "казак",
  "топот",
  "довод",
  "шалаш",
  "абба",
  "дед",
  "баурсак",
  "велосипед",
];

// ЭТО НЕ ПРАВИЛЬНО. Отрицательные индексы так не будут работать в JS
// palindromesArray[-1] = "дед";
// console.log(`Тест: ${palindromesArray[-1]}`);
// console.log(palindromesArray);

// классический способ
// const last = palindromesArray[palindromesArray.length - 1];

// современный, с ES2022
// const last = palindromesArray.at(-1);

// С помощью современного способа поменяю последний элемент массива

// Тоже не рабочий варинат. at - геттер. Не даст ссылку на элемент коллекции а просто вернет значение
// palindromesArray.at(-1) = "репа";
// console.log(palindromesArray);
palindromesArray[palindromesArray.length - 1] = "репа";

// Прогоним forEach с нашей функцией №2
palindromesArray.forEach(isPalindrome2); // тут будет ничего не видно - мы не выводим данные в консоль

//PRACTICE - Попробуйте набрать эту стрелку
palindromesArray.forEach((word) =>
  console.log(
    `№${palindromesArray.indexOf(word) + 1} - ${word} - ${isPalindrome2(word)}`
  )
);

// .map - перебирает элементы массива и возвращает новый массив
// .filter - перебирает элементы массива и возвращает новый массив, состоящий из элементов, удовлетворяющих условию
// .some - перебирает элементы массива и возвращает true, если хотя бы один элемент удовлетворяет условию
// .every - перебирает элементы массива и возвращает true, если все элементы удовлетворяют условию

// Если нам нужно собрать НОВЫЙ массив. forEach не очень подходит, потому что снаружи надо будет создать пустой массив и делать push. А вот map - отлично подходит.

let newPalindromesArray = palindromesArray.map((word) => word.toLowerCase());

//PRACTICE - Попробуйте набрать два фильтра и проверку some \ every
// Фильтр - получим только палиндромы
let palindromesArray2 = palindromesArray.filter((word) => isPalindrome2(word));
let notPalindromesArray = palindromesArray.filter(
  (word) => !isPalindrome2(word)
);

// .some - перебирает элементы массива и возвращает true, если хотя бы один элемент удовлетворяет условию
// .every - перебирает элементы массива и возвращает true, если все элементы удовлетворяют условию

let isEveryPalindromes = palindromesArray.every((word) => isPalindrome2(word));
let isSomePalindromes = palindromesArray.some((word) => isPalindrome2(word));

console.log(isEveryPalindromes);
console.log(isSomePalindromes);

// с - удаляет элементы из массива
// Попробуем на последних четырёх словах из массива

// Синтаксис
// array.splice(start, deleteCount, item1, item2, ...)

// javascript

// Параметры
// start (обязательный)

// Индекс, с которого начинаются изменения в массиве.
// Если start положительный, отсчет начинается с начала массива (0 — первый элемент).
// Если start отрицательный, отсчет начинается с конца массива. Например, -1 означает последний элемент, -2 — предпоследний и т.д.
// Если start больше длины массива, он будет установлен на длину массива (то есть, изменения будут происходить в конце).
// Если start очень большое отрицательное число (меньше, чем -array.length), он будет установлен на 0.
// deleteCount (необязательный)

// Целое число, указывающее количество элементов, которые нужно удалить, начиная с индекса start.
// Если deleteCount опущен или равен 0, элементы не удаляются.
// Если deleteCount больше, чем количество оставшихся элементов от start до конца массива, будут удалены все элементы от start до конца.
// Если deleteCount отрицательный, он будет трактоваться как 0.
// item1, item2, ... (необязательные)

// Элементы, которые нужно добавить в массив, начиная с индекса start.
// Если эти аргументы не указаны, splice() просто удалит элементы (если deleteCount > 0).
// Возвращаемое значение
// Метод splice() возвращает массив, содержащий удаленные элементы. Если элементы не были удалены (например, если deleteCount был 0), возвращается пустой массив [].

// Пробуем spliece на нашем массиве
// С одним стартовым индексом. Тут мы удаляем все элементы после стартового индекса.
let newArr = palindromesArray.splice(1);
console.log(newArr);
console.log(palindromesArray);
