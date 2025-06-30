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

// 7. Функция которая создает кнопку и вешает логику удаления карточки
function createDeleteButton(taskCard) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", () => {
    taskCard.remove();
    console.log(`Карточка удалена`);
  });
  return deleteButton;
}

// 8. Функция создает кнопку редактировать текст карточки и вешает логику редактирования текста
function createEditButton(taskTextDiv) {
  const editButton = document.createElement("button");
  editButton.textContent = "✏️";
  editButton.addEventListener("click", () => {
    const newText = prompt(
      "Введите новый текст задачи:",
      taskTextDiv.textContent
    );
    //   Перезапись
    taskTextDiv.textContent = newText;
    console.log(`Текст карточки изменен`);
  });
  return editButton;
}

// 9. Функция создает кнопку завершить задачу и вешает логику перемещения карточки в <div class="done-container"></div>
function createDoneButton(taskCard) {
  const doneButton = document.createElement("button");
  doneButton.textContent = "✅";
  doneButton.addEventListener("click", () => {
    const doneContainer = document.querySelector(".done-container");
    doneContainer.appendChild(taskCard);
    console.log(`Карточка перемещена в выполненные`);
  });
  return doneButton;
}

// 2. Функция создает карточку задачи
function createTaskCard(taskText) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("task");

  //   СОЗДАНИЕ 2 DIV - для текста и для кнопок div.task-text  div.task-buttons
  const taskTextDiv = document.createElement("div");
  taskTextDiv.classList.add("task-text");

  const taskButtonsDiv = document.createElement("div");
  taskButtonsDiv.classList.add("task-buttons");

  taskTextDiv.textContent = taskText;
  //   ДОБАВЛЕНИЕ ВСЕХ КНОПОК В КАРТОЧКУ
  //    Создаем кнопку удаления и добавляем её в карточку
  const deleteButton = createDeleteButton(taskCard);
  taskButtonsDiv.appendChild(deleteButton);
  //    Создаем кнопку редактирования и добавляем её в карточку
  const editButton = createEditButton(taskTextDiv);
  taskButtonsDiv.appendChild(editButton);
  //    Создаем кнопку выполнения и добавляем её в карточку
  const doneButton = createDoneButton(taskCard);
  taskButtonsDiv.appendChild(doneButton);

  // Добавляем контейнер текста и контейнер кнопок
  taskCard.appendChild(taskTextDiv);
  taskCard.appendChild(taskButtonsDiv);
  return taskCard;
}

// 3. Функция добавляет карточку в список дел
function addTaskToList(container, taskCard) {
  container.appendChild(taskCard);
}

// 4. Главная функция создания задачи
function createTaskItem() {
  const taskText = askUser();
  const taskCard = createTaskCard(taskText);
  addTaskToList(toDoContainer, taskCard);
}

// 5. Обработчик события для кнопки "Создать задачу"
createTask.addEventListener("click", createTaskItem);
