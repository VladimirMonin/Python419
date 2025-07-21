// 1. Функция через промпт спрашивает у пользователя какую задачу он хочет добавить в список дел.
// 2. Функция создает карточку задачи
// 3. Функция добавляет карточку в список дел

const createTask = document.getElementById("createTask");
const toDoContainer = document.querySelector(".todo-container");
const doneContainer = document.querySelector(".done-container");
const inputSearchTask = document.getElementById("taskName");
const form = document.querySelector("form");

// 1. Функция через промпт спрашивает у пользователя какую задачу он хочет добавить в список дел.
// function askUser() {
//   const taskText = prompt("Какую задачу вы хотите добавить в список дел?");
//   return taskText;
// }

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
// 9. Функция создает кнопку завершить/вернуть задачу
function createToggleButton(taskCard) {
  const toggleButton = document.createElement("button");

  // Проверяем, в каком контейнере находится задача
  const isInDoneContainer = taskCard.closest(".done-container");

  if (isInDoneContainer) {
    // Если задача в выполненных - показываем кнопку возврата
    toggleButton.textContent = "↩️";
    toggleButton.title = "Вернуть в активные";
  } else {
    // Если задача активная - показываем кнопку выполнения
    toggleButton.textContent = "✅";
    toggleButton.title = "Отметить как выполненную";
  }

  toggleButton.addEventListener("click", () => {
    const currentContainer = taskCard.parentElement;

    if (currentContainer.classList.contains("done-container")) {
      // Возвращаем из выполненных в активные
      toDoContainer.appendChild(taskCard);
      toggleButton.textContent = "✅";
      toggleButton.title = "Отметить как выполненную";
      console.log(`Задача возвращена в активные`);
    } else {
      // Перемещаем в выполненные
      doneContainer.appendChild(taskCard);
      toggleButton.textContent = "↩️";
      toggleButton.title = "Вернуть в активные";
      console.log(`Задача отмечена как выполненная`);
    }
  });

  return toggleButton;
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
  const doneButton = createToggleButton(taskCard);
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
// function createTaskItem() {
//   const taskText = askUser();
//   const taskCard = createTaskCard(taskText);
//   addTaskToList(toDoContainer, taskCard);
// }

// 5. Обработчик события для кнопки "Создать задачу"
createTask.addEventListener("click", createTaskItemFromInput);

// 10. Листнер на поле ввода
inputSearchTask.addEventListener("input", toggleTaskCardsVisibility);

// 13. Выношу логику обхода карточек в отдельную функцию - потому что она будет использоваться в 10. и в 12
function toggleTaskCardsVisibility() {
  // Получаем значение из поля ввода
  const searchText = inputSearchTask.value.toLowerCase();

  // Получаем все карточки задач
  const taskCards = document.querySelectorAll(".task");
  // Проходим по всем карточкам и скрываем те, которые не соответствуют поиску
  taskCards.forEach((taskCard) => {
    const taskText = taskCard
      .querySelector(".task-text")
      .textContent.toLowerCase();
    if (!taskText.includes(searchText)) {
      taskCard.style.display = "none";
    } else {
      taskCard.style.display = "flex";
    }
  });
}

// 11 функция извлекающая текст из поля ввода inputSearchTask и создающая карточку
function createTaskItemFromInput() {
  const taskText = inputSearchTask.value;
  //   Уточняем, хочет ли пользователь создать задачу
  const confirmCreation = confirm(
    `Вы уверены, что хотите создать задачу "${taskText}"?`
  );
  if (!confirmCreation) {
    return; // Если пользователь отменил создание, выходим из функции
  }
  const taskCard = createTaskCard(taskText);
  addTaskToList(toDoContainer, taskCard);
  inputSearchTask.value = "";
}

// 12. Блокирование отправки формы и запуск создания задачи
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
  createTaskItemFromInput();
  toggleTaskCardsVisibility();
});

// 14. Функция добычи CSRF токена из cookie
function getCsrfToken() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    // Проверка на вхождение в имя названия "CSRF-Token"
    if (name.includes("CSRF-Token")) {
      return value;
    }
  }
  return null;
}

// 15. Функция для отправки POST на сервер.
// Она асинхронная, принемает CSRF, URL, и данные для отправки
// Формирует заголовки и тело запроса, отправляет запрос на сервер и возвращает ответ
async function sendPostRequest(csrfToken, url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });

    // Проверяем, успешен ли ответ (статус 200-299)
    if (!response.ok) {
      // Если нет, создаем ошибку с текстом статуса
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Возвращаем результат, распарсив его как JSON
    return await response.json();
  } catch (error) {
    // Ловим как сетевые ошибки, так и HTTP-ошибки
    console.error("Ошибка при отправке запроса:", error);
    // Возвращаем null или можно выбросить ошибку дальше
    return null;
  }
}
