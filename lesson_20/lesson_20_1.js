const API_KEY = "23496c2a58b99648af590ee8a29c5348";
const API_KEY2 = "578660fff873f606fa1c43e56d64ba6c";

const metric = "metric";
const lang = "ru";

const inputWeather = document.getElementById("inputWeather");
const btnWeather = document.getElementById("btnWeather");
const weatherResult = document.getElementById("weatherResult");
const weatherForm = document.getElementById("weatherForm");
const spinner = document.getElementById("loadingSpinner");
const ssLastCityKey = "lastCity";
const lastCity = localStorage.getItem(ssLastCityKey);
const card = document.getElementById("card");
const cardCityName = document.getElementById("cardCityName");
const cardTemp = document.getElementById("cardTemp");
const cardTempFeels = document.getElementById("cardTempFeels");

async function getResponseWithRetries(url, retries = 3, baseDelay = 1000) {
  // Создаем цикл с повторами
  for (let attempt = 1; attempt <= retries; attempt++) {
    // Блок Try - Catch
    try {
      //   console.log(`Запрос №${attempt} к ${url}`);
      // Отправляем запрос и получаем ответ
      const response = await fetch(url);
      // Проверяем статус ответа
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }
      // Мы получили статус 200 - можно отдать ответ
      return await response.json();
    } catch (error) {
      console.error(`Попытка ${attempt} не удалась:`, error.message);

      // 6. Проверка на последнюю попытку: это ключевой момент.
      //    Если текущая попытка была последней, мы больше не должны "проглатывать"
      //    ошибку. Мы должны "выбросить" ее дальше, чтобы код, вызвавший
      //    `fetchWithRetries`, узнал, что операция в итоге провалилась.
      if (attempt === retries) {
        throw new Error(`Не удалось получить данные после ${retries} попыток.`);
      }

      // 7. Задержка: если это была не последняя попытка, мы ждем указанное
      //    время перед тем, как цикл перейдет к следующей итерации.
      await new Promise((resolve) => setTimeout(resolve, baseDelay * attempt));
    }
  }
}

// Функция добывающая данные геокодирования используя getResponseWithRetries на вход берет название города
async function getGeocoding(city) {
  try {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    console.log("Отправляется запрос на геокодирование");
    const response = await getResponseWithRetries(url);
    //  Формируем объект с ключами lat и lon
    const result = {
      lat: response[0].lat,
      lon: response[0].lon,
    };
    console.log(`Получены координаты: ${result.lat}, ${result.lon}`);
    return result;
  } catch (error) {
    console.error("Произошла ошибка при получении данных:", error);
    throw error;
  }
}
// Функция для получения данных о погоде
async function getWeather(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${metric}&lang=${lang}`;
    console.log("Отправляется запрос на текущую погоду");
    const response = await getResponseWithRetries(url);
    console.log("Получены данные о погоде");
    return response;
  } catch (error) {
    console.error(
      `Ошибка при получении текущий данных о погоде: ${error.message}`
    );
    throw error;
  }
}

// Функция для получения данных о выбросах в воздухе
async function getAirPollution(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    console.log("Отправляется запрос на данные о выбросах в воздухе");
    const response = await getResponseWithRetries(url);
    const result = response.list[0].main.aqi;
    console.log(`Получены данные о выбросах в воздухе: ${result}`);
    return result;
  } catch (error) {
    console.error(
      `Ошибка при получении данных о выбросах в воздухе: ${error.message}`
    );
    throw error;
  }
}

// Функция для получения погоды на 5 дней
async function getWeather5Days(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${metric}&lang=${lang}`;
    console.log("Отправляется запрос на погоду на 5 дней");
    const response = await getResponseWithRetries(url);
    console.log(response);
    return response;
  } catch (error) {
    console.error(
      `Ошибка при получении данных о погоде на 5 дней: ${error.message}`
    );
    throw error;
  }
}

// Функция для отображения и сокрытия спиннера. Принемает true или false
function toggleElement(show, element) {
  element.style.display = show ? "inline-block" : "none";
}

async function displayWeatherOnClick() {
  //   Запуск спиннера
  toggleElement(true, spinner);
  const city = inputWeather.value;

  //   Получаем данные геокодирования для города
  try {
    const geocodingData = await getGeocoding(city);
    // Получаем данные о погоде
    const weatherData = await getWeather(geocodingData.lat, geocodingData.lon);
    // Получаем данные о выбросах в воздухе
    const airPollutionData = await getAirPollution(
      geocodingData.lat,
      geocodingData.lon
    );
    // Получаем данные о погоде на 5 дней
    const weather5DaysData = await getWeather5Days(
      geocodingData.lat,
      geocodingData.lon
    );
    // Отображаем данные о погоде
    renderWeatherCard(weatherData);
    // Отображаем данные о выбросах в воздухе
    // renderAirPollutionCard(airPollutionData);
    // Отображаем данные о погоде на 5 дней
    // renderWeather5DaysCard(weather5DaysData);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  } finally {
    // Остановливаем спиннер
    toggleElement(false, spinner);
  }
}
// Отдельная функция рендера карточки с погодой. Если нет данных - показываем сообщение об ошибке
function renderWeatherCard(weatherData) {
  if (!weatherData) {
    cardCityName.innerHTML = "Не удалось получить данные о погоде.";
    cardTemp.innerHTML = "-";
    cardTempFeels.innerHTML = "-";
    cardWind.innerHTML = "-";
    return;
  }

  let temp = weatherData.main.temp;
  let feels = weatherData.main.feels_like;
  let city = weatherData.name;
  let wind = weatherData.wind.speed;

  cardCityName.innerHTML = city;
  cardTemp.innerHTML = temp;
  cardTempFeels.innerHTML = feels;
  cardWind.innerHTML = wind;
  // Воспользоваться функцией toggleElement
  toggleElement(true, card);
}

// Вешаем обработчик отправка формы и блокируем стандартное поведение + делаем запрос погоды
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //   Впишем в localStorage последний введенный город
  localStorage.setItem(ssLastCityKey, inputWeather.value);
  displayWeatherOnClick();
});

// Загружаем последний город из localStorage по загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  if (lastCity) {
    inputWeather.value = lastCity;
    displayWeatherOnClick();
  }
});

// LocalStorage - долгое хранение данных в браузере
// localStorage.setItem("key", "value");
// localStorage.getItem("key");
// localStorage.removeItem("key");
// localStorage.clear();
