const API_KEY = "23496c2a58b99648af590ee8a29c5348";
const API_KEY2 = "578660fff873f606fa1c43e56d64ba6c";

const city = "Бангкок";
const metric = "metric";
const lang = "ru";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${metric}&lang=${lang}`;

const inputWeather = document.getElementById("inputWeather");
const btnWeather = document.getElementById("btnWeather");
const weatherResult = document.getElementById("weatherResult");
const weatherForm = document.getElementById("weatherForm");

async function getWeather() {
  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data);
  return data;
}

// Запуск функции
// getWeather();

// Вызов
// getWeather().then((data) => {
//   console.log(data);
// });

// 2 вариант Fetch - пошаговая цепочка .then
console.log("Запускаем fetch...");
fetch(url)
  .then((response) => {
    console.log("--- Первый .then ---");
    console.log("Шаг 1: Получили объект Response от сервера.");
    // response - это еще не сами данные, а объект ответа от сервера.
    // Он содержит статус, заголовки и другую мета-информацию.
    // console.log(response);

    // Чтобы извлечь данные в формате JSON, нужно вызвать метод .json().
    // Важно: .json() тоже возвращает промис!
    const dataPromise = response.json();
    console.log(
      "Шаг 2: Вызвали response.json(). Возвращаем промис с данными дальше."
    );

    // Мы должны вернуть этот новый промис, чтобы следующий .then в цепочке мог его обработать.
    return dataPromise;
  })
  .then((data) => {
    console.log("--- Второй .then ---");
    // В этот .then приходят уже готовые данные,
    // результат выполнения промиса, который мы вернули на предыдущем шаге.
    console.log("Шаг 3: Получили и выводим итоговые данные (data).");
    console.log(data);
  });

// Promise - объект, который представляет собой некое обещание результата. При этом результат может быть как успешным, так и неудачным.

// .then - метод который позволяет обрабатывать результы этого обещания

// 1. Мы создаем объект Promise
// 2. Мы делаем все что хотим с JS кодом
// 3. В критическом нужном месте мы востребуем ответ от Promise

// 1. Спрашиваем у пользователя Город
// 2. Формируем промис сделав запрос по GEO API
// 3. Но так как для дальнейшей работы нам нужно получить координаты - мы требуем ответа от Promise
// 4. Мы делаем запрос к 1-2-3-10 маршрутам с этими данными. НО если делать then или await - они будут ПОСЛЕДОВАТЕЛЬНЫ
// Нам нужно запустить серию запросов одновременно - это можно сделать с помощью Promise.all
//  Таким образом это будет не 2+2+2 = 6 секунд а 2.000001 секунд Общее время выполнения = самому долгому запросу

async function getWeather2(city) {
  // Формируем URL для запроса
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${metric}&lang=${lang}`;
  // Отправляем запрос и получаем ответ
  const response = await fetch(url);
  // Формируем промис ответа в виде объекта
  const data = await response.json();
  // Возвращаем промис с данными
  return data;
}

async function displayWeatherOnClick() {
  const city = inputWeather.value;
  const weather = await getWeather2(city);
  const tempt = weather.main.temp;
  const wind = weather.wind.speed;
  const weatherString = `Температура: ${tempt}°C, Скорость ветра: ${wind} м/с`;
  weatherResult.innerHTML = weatherString;
  console.log(weatherString);
}

// Вешаем обработчик отправка формы и блокируем стандартное поведение + делаем запрос погоды
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displayWeatherOnClick();
});