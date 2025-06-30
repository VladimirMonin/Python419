// 1. Функция через промпт спрашивает у пользователя какую задачу он хочет добавить в список дел.
// 2. Функция создает карточку задачи
// 3. Функция добавляет карточку в список дел

const createTask = document.getElementById("createTask");
const toDoContainer = document.querySelector(".todo-container");
const doneContainer = document.querySelector(".done-container");

// 1. Функция через промпт спрашивает у пользователя какую задачу он хочет добавить в список дел.
function askUser() {
  const taskText = prompt("Какую задачу вы хотите добавить в список дел?");
  return taskText;
}

// 2. Функция создает карточку задачи
function createTaskCard(taskText) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("task");
  taskCard.textContent = taskText;
  return taskCard;
}

// 3. Функция добавляет карточку в список дел
function addTaskToList(container, taskCard) {
  container.appendChild(taskCard);
}

// 4. Главная функция
function main() {
  const taskText = askUser();
  const taskCard = createTaskCard(taskText);
  addTaskToList(toDoContainer, taskCard);
}
