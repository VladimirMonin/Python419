// Добыли элементы
// Вывод на сайте
let userAvatarResult = document.getElementById("userAvatarResult");
let fullNameResult = document.getElementById("fullNameResult");
let birthDateResult = document.getElementById("birthDateResult");
let spinnerBorder = document.querySelector(".spinner-border");

// Ввод на сайте
let fullNameInput = document.getElementById("fullNameInput");
let birthDateInput = document.getElementById("birthDateInput");
let avatarInput = document.getElementById("avatarInput");
let updateForm = document.getElementById("updateForm");
let formBnt = document.getElementById("formBnt");
// Дальше может быть логика :)

// 1. Блокируем стандартное поведение отправки формы
// 2. Добываем данные из формы
// ----
// 3. Отправляем данные на сервер
// Если сервера нет, можно отправить данные хоть на Google.com
// Для имитиации ожидания установить таймаут от 2 до 5

// Можно крутить спиннер или что-то еще
// ----
// 4. Получаем ответ от сервера
// 5. Меняем данные на страничке
// ----

// Функция отправки данных на сервер (имитация)
async function sendDataToServer(data) {
  // Имитация ожидания
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // Получаем ответ от сервера
  return {
    fullName: "Монин Владимир Александрович",
    birthDate: "1988-11-11",
    avatar:
      "https://i.pinimg.com/originals/15/1f/4e/151f4e731b37e9b9fc354be59dbed80d.jpg",
  };
}

document.addEventListener("DOMContentLoaded", function () {
  updateForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Добавляем кнопке d-none
    formBnt.classList.add("d-none");
    // Добавляем спиннер
    spinnerBorder.classList.remove("d-none");

    // Получаем данные из формы
    let fullName = fullNameInput.value;
    let birthDate = birthDateInput.value;
    let avatar = avatarInput.value;

    // Создаем объект с данными
    let data = {
      fullName,
      birthDate,
      avatar,
    };

    // Отправляем данные на сервер
    sendDataToServer(data).then((response) => {
      // Меняем данные на страничке
      userAvatarResult.src = response.avatar;
      fullNameResult.textContent = fullName;
      birthDateResult.textContent = birthDate;
      // Убрать спиннер показать кнопку
      spinnerBorder.classList.add("d-none");
      formBnt.classList.remove("d-none");
    });

    // лог в консоль
    // "C:\Users\user\Pictures\1.jpg"
    console.log(fullName, birthDate, avatar);
  });
});
