const API_KEY = "23496c2a58b99648af590ee8a29c5348";
const API_KEY2 = "578660fff873f606fa1c43e56d64ba6c";

const metric = "metric";
const lang = "ru";

const inputWeather = document.getElementById("inputWeather");
const btnWeather = document.getElementById("btnWeather");
const weatherResult = document.getElementById("weatherResult");
const weatherForm = document.getElementById("weatherForm");
const spinner = document.getElementById("loadingSpinner");

async function getResponseWithRetries(url, retries = 3, baseDelay = 1000) {
  // Создаем цикл с повторами
  for (let attempt = 1; attempt <= retries; attempt++) {
    // Блок Try - Catch
    try {
      console.log(`Запрос №${attempt} к ${url}`);
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

// Функция для отображения и сокрытия спиннера. Принемает true или false
function toggleSpinner(show) {
  spinner.style.display = show ? "inline-block" : "none";
}

async function displayWeatherOnClick() {
  //   Запуск спиннера
  toggleSpinner(true);
  const city = inputWeather.value;
  //   Формируем URL для запроса
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${metric}&lang=${lang}`;

  //  Отправляем запрос через Try Catch - если ошибка - 3 попытки провалились
  try {
    const weather = await getResponseWithRetries(url);
    // Обработка успешного ответа
    console.log("Успешный ответ:", weather);
    const tempt = weather.main.temp;
    const wind = weather.wind.speed;
    const weatherString = `Температура: ${tempt}°C, Скорость ветра: ${wind} м/с`;
    weatherResult.innerHTML = weatherString;
  } catch (error) {
    console.error("Произошла ошибка при получении данных:", error);
    weatherResult.innerHTML = "Не удалось получить данные о погоде.";
  } finally {
    //   Завершение спиннера - выключаем через finally
    toggleSpinner(false);
  }
}

// Вешаем обработчик отправка формы и блокируем стандартное поведение + делаем запрос погоды
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  displayWeatherOnClick();
});
