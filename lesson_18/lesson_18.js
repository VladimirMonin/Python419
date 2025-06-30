const btn1 = document.getElementById("btn1");

// Вариант 1. - Добавляем обработчик события через объявление функции способом Function Declaration
// btn1.addEventListener("click", function () {
//   alert("Hello World!");
//   console.log("Hello World!");
// });

// Вариант 2. Объявляем функцию отдельно

function showMessage() {
  alert("Hello World!");
  console.log("Hello World!");
}

// Добавляем обработчик события через объявление функции способом Function Expression
btn1.addEventListener("click", showMessage);

// Событие keydown
document.addEventListener("keydown", function (event) {
  //   console.log(event);
  console.log(event.key);
});

// Событие click - заглядываем в Event Object
document.addEventListener("click", function (event) {
  console.log(event);
  console.log(event.target);
  console.log(event.target.id);
  console.log(event.target.tagName);
});

// Опишем логику которая позволит создавать div-кругляш рандомного цвета по координатам клика и добавим это в обработчик события click на весь документ

// Функция генерации рандомного цвета RGB
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Функция принемает объект события и создает div-кругляш по координатам клика с рандомным цветом

function createCircle(event) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.backgroundColor = getRandomColor();
  circle.style.left = `${event.clientX}px`;
  circle.style.top = `${event.clientY}px`;
  document.body.appendChild(circle);
  setTimeout(() => {
    circle.remove();
  }, 2000);
}

// У нас есть <div id="dropArea"></div> опишем обработчик события для него

const dropArea = document.getElementById("dropArea");

// Предотвращаем стандартное поведение браузера
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
});

// Добавляем класс для визуального отклика
dropArea.addEventListener("dragenter", (event) => {
  event.preventDefault();
  dropArea.classList.add("dragover");
});

// Убираем класс
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (event) => {
  // Прерываем стандартное поведение (открыть файл)
  event.preventDefault();
  dropArea.classList.remove("dragover");
  console.log("Файл был сброшен!");

  // Получаем доступ к файлам
  const files = event.dataTransfer.files;
  console.log(files);

  // Тут можно добавить логику для обработки файлов
});

// Добавляем обработчик события click на весь документ
// document.addEventListener("mousemove", createCircle);

// По загрузке документа добавим свои листнеры

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", createCircle);
  document.addEventListener("mousemove", createCircle);
});
