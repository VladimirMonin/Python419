// Lesson 17 DOM - Document Object Model
// DOM - это структура данных, которая представляет собой дерево элементов HTML-страницы + методы и свойства для взаимодействия с этим деревом.

// Весь документ!
console.log(document);

// document.body - это корневой элемент HTML-страницы
console.log(document.body);

// document.body.childNodes - это коллекция всех дочерних элементов корневого элемента, включая текстовые узлы
console.log(document.body.childNodes);

// document.body.children - это коллекция всех дочерних элементов корневого элемента, исключая текстовые узлы
console.log(document.body.children);

// document.body.firstChild - это первый дочерний элемент корневого элемента, включая текстовые узлы
// document.body.firstElementChild - это первый дочерний элемент корневого элемента, исключая текстовые узлы
// document.body.lastChild - это последний дочерний элемент корневого элемента, включая текстовые узлы
// document.body.lastElementChild - это последний дочерний элемент корневого элемента, исключая текстовые узлы

// Методы добычи элементов живые коллекции
// document.getElementById(id) - возвращает элемент с заданным id
// document.getElementsByClassName(className) - возвращает коллекцию элементов с заданным классом
// document.getElementsByTagName(tagName) - возвращает коллекцию элементов с заданным тегом

// Методы добычи элементов статические коллекции

// document.querySelector(selector) - возвращает первый элемент, соответствующий заданному селектору
// document.querySelectorAll(selector) - возвращает все элементы, соответствующие заданному селектору

let divContainer = document.querySelector(".container");

// Все его наследники
console.log(divContainer.children);

// Возможно получить его соседей
console.log(divContainer.nextElementSibling);

// PRACTICE - Получить все карточки через querySelectorAll селектор: div.container > div.card

let cards = document.querySelectorAll("div.container > div.card");
console.log(cards);

// Получим h1
let h1 = document.querySelector("h1");

// Какие варианты модификации у нас есть?
// 1. Изменить текст. Безопасно это делать через свойство textContent
// 2. Изменить текст не безопасно это делать через свойство innerText
// 3. Задать ему классы - через свойство className
// 4. Задать ему атрибуты - через свойство setAttribute
// 5. Задать ему стили - через свойство style

h1.textContent = "Урок 17. DOM - Document Object Model";
h1.style.color = "green";
h1.style.backgroundColor = "yellow";
h1.classList.add("shadow");

console.log(h1);

// Воспользуемся коллекцией из переменной cards - обойдем forEach - и допишем текст
cards.forEach((card) => {
  card.textContent += " - Текст через JS";
});
const body = document.body;
let discoInterval = null;

function changeBGColor() {
  let newRed = Math.floor(Math.random() * 256);
  let newGreen = Math.floor(Math.random() * 256);
  let newBlue = Math.floor(Math.random() * 256);
  body.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
}

function discoStart() {
  if (body.getAttribute("discoState") === "off") {
    // Сохраняем ID интервала
    discoInterval = setInterval(changeBGColor, 100);
    body.setAttribute("discoState", "on");
    console.log("Disco mode ON");
  } else {
    // Останавливаем по сохраненному ID
    clearInterval(discoInterval);
    body.setAttribute("discoState", "off");
    console.log("Disco mode OFF");
  }
}

// свойство отвечающее за изображение заднего фона
// body.style.backgroundImage = "./img/bg.jpg";

// Функция изменяющая flex-direction у контейнера на column и обратно на  row
function changeFlexDirection() {
  let container = document.querySelector(".container");
  const computedStyle = window.getComputedStyle(container);
  if (computedStyle.flexDirection === "row") {
    container.style.flexDirection = "column";
  } else {
    container.style.flexDirection = "row";
  }
}

function containerDirectionToggle() {
  let container = document.querySelector(".container");
  container.classList.toggle("container-column");
}

// Как бы это выглядело без Toggle
function containerDirectionToggle2() {
  let container = document.querySelector(".container");
  if (container.classList.contains("container-column")) {
    container.classList.remove("container-column");
  } else {
    container.classList.add("container-column");
  }
}

// Переключение display=none для контейнера
function containerDisplayToggle() {
  let container = document.querySelector(".container");
  const computedStyle = window.getComputedStyle(container);
  if (computedStyle.display === "none") {
    container.style.display = "flex";
  } else {
    container.style.display = "none";
  }
}

// Коллекция class list
// Методы:
// add() - добавляет класс
// remove() - удаляет класс
// toggle() - добавляет класс, если его нет, и удаляет, если он есть
// contains() - проверяет, есть ли класс

// Как создать элемент?
let newCard = document.createElement("div")
newCard.classList.add("card");
newCard.textContent = "Карточка из JS";
console.log(newCard);


// Как добавить элемент в DOM?
// 1. Добавить в конец контейнера - append
// 2. Добавить в начало контейнера - prepend
// 3. Добавить перед элементом - before
// 4. Добавить после элемента - after

let divContainer2 = document.querySelector(".container");
divContainer2.append(newCard);

// Функция создать карточку
let lastCardNum = 7
function createCard() {
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  let cardText = `Карточка ${lastCardNum}`;
  newCard.textContent = cardText;
  lastCardNum++;
  divContainer2.append(newCard);
}

function createCardUserText() {
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  let cardText = prompt("Введите текст карточки");
  newCard.textContent = cardText;
  lastCardNum++;
  divContainer2.append(newCard);
}