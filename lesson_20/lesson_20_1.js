const API_KEY = "23496c2a58b99648af590ee8a29c5348";
const API_KEY2 = "578660fff873f606fa1c43e56d64ba6c";

const metric = "metric";
const lang = "ru";
const FORECAST_STEP =  4; // Шаг для отображения прогноза (8 * 3 часа = 24 часа)

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const card = document.getElementById("card");
const cardCityName = document.getElementById("cardCityName");
const cardTemp = document.getElementById("cardTemp");
const cardTempFeels = document.getElementById("cardTempFeels");
const cardWind = document.getElementById("cardWind");
const currentWeatherIcon = document.getElementById("currentWeatherIcon");
const airPollutionCard = document.getElementById("airPollutionCard");
const airQuality = document.getElementById("airQuality");
const forecastContainer = document.getElementById("forecastContainer");

const ssLastCityKey = "lastCity";
const lastCity = localStorage.getItem(ssLastCityKey);

async function getResponseWithRetries(url, retries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Попытка ${attempt} не удалась:`, error.message);
      if (attempt === retries) {
        throw new Error(`Не удалось получить данные после ${retries} попыток.`);
      }
      await new Promise((resolve) => setTimeout(resolve, baseDelay * attempt));
    }
  }
}

async function getGeocoding(city) {
  try {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    const response = await getResponseWithRetries(url);
    if (!response || response.length === 0) {
        throw new Error("Город не найден");
    }
    return {
      lat: response[0].lat,
      lon: response[0].lon,
    };
  } catch (error) {
    console.error("Произошла ошибка при получении данных:", error);
    throw error;
  }
}

async function getWeather(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${metric}&lang=${lang}`;
    return await getResponseWithRetries(url);
  } catch (error) {
    console.error(`Ошибка при получении текущий данных о погоде: ${error.message}`);
    throw error;
  }
}

async function getAirPollution(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await getResponseWithRetries(url);
    return response.list[0].main.aqi;
  } catch (error) {
    console.error(`Ошибка при получении данных о выбросах в воздухе: ${error.message}`);
    throw error;
  }
}

async function getWeather5Days(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${metric}&lang=${lang}`;
    return await getResponseWithRetries(url);
  } catch (error) {
    console.error(`Ошибка при получении данных о погоде на 5 дней: ${error.message}`);
    throw error;
  }
}

function toggleElement(element, show) {
    element.style.display = show ? "block" : "none";
}

function showAlert(message, type = 'danger') {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.querySelector('.container').insertAdjacentHTML('afterbegin', alertHtml);
}


async function displayWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    showAlert("Пожалуйста, введите название города.");
    return;
  }

  getWeatherBtn.disabled = true;
  getWeatherBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Загрузка...';

  try {
    const geocodingData = await getGeocoding(city);
    
    const [weatherData, airPollutionData, weather5DaysData] = await Promise.all([
      getWeather(geocodingData.lat, geocodingData.lon),
      getAirPollution(geocodingData.lat, geocodingData.lon),
      getWeather5Days(geocodingData.lat, geocodingData.lon),
    ]);

    renderWeatherCard(weatherData);
    renderAirPollutionCard(airPollutionData);
    renderWeather5DaysCard(weather5DaysData);
    
    localStorage.setItem(ssLastCityKey, city);

  } catch (error) {
    console.error(`Ошибка при отображении погоды: ${error.message}`);
    showAlert(`Не удалось получить данные для города "${city}". Пожалуйста, проверьте название и попробуйте снова.`);
    toggleElement(card, false);
    toggleElement(airPollutionCard, false);
    forecastContainer.innerHTML = "";
  } finally {
    getWeatherBtn.disabled = false;
    getWeatherBtn.innerHTML = '<i class="bi bi-search"></i> Получить погоду';
  }
}

function renderWeatherCard(weatherData) {
  if (!weatherData) return;

  const {
    main: { temp, feels_like: feels },
    name: city,
    wind: { speed: wind },
    weather: [{ icon }],
  } = weatherData;

  cardCityName.innerHTML = city;
  cardTemp.innerHTML = `<i class="bi bi-thermometer-half"></i> Температура: <strong>${temp.toFixed(1)}°C</strong>`;
  cardTempFeels.innerHTML = `<i class="bi bi-person"></i> Ощущается как: <strong>${feels.toFixed(1)}°C</strong>`;
  cardWind.innerHTML = `<i class="bi bi-wind"></i> Ветер: <strong>${wind} м/с</strong>`;
  currentWeatherIcon.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  toggleElement(card, true);
}

function renderAirPollutionCard(airPollutionData) {
  if (airPollutionData === undefined) return;

  const qualityIndex = airPollutionData;
  let qualityText = "";
  let qualityColor = "";

  switch (qualityIndex) {
    case 1: qualityText = "Отличное"; qualityColor = "text-success"; break;
    case 2: qualityText = "Хорошее"; qualityColor = "text-success"; break;
    case 3: qualityText = "Умеренное"; qualityColor = "text-warning"; break;
    case 4: qualityText = "Плохое"; qualityColor = "text-danger"; break;
    case 5: qualityText = "Очень плохое"; qualityColor = "text-danger"; break;
    default: qualityText = "Нет данных"; qualityColor = "text-muted";
  }
  airQuality.innerHTML = `<i class="bi bi-lungs"></i> Качество: <strong class="${qualityColor}">${qualityText}</strong>`;
  toggleElement(airPollutionCard, true);
}

function renderWeather5DaysCard(weather5DaysData) {
  if (!weather5DaysData) return;

  forecastContainer.innerHTML = ""; 

  for (let i = 0; i < weather5DaysData.list.length; i += FORECAST_STEP) {
    const forecast = weather5DaysData.list[i];
    const date = new Date(forecast.dt * 1000);
    const dateString = date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
    const timeString = date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

    const temp = forecast.main.temp;
    const weatherDescription = forecast.weather[0].description;
    const weatherIcon = forecast.weather[0].icon;

    const cardHtml = `
      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-body">
            <h5 class="card-title">${dateString}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${timeString}</h6>
            <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}">
            <p class="card-text fs-5"><strong>${temp.toFixed(1)}°C</strong></p>
            <p class="card-text text-muted small">${weatherDescription}</p>
          </div>
        </div>
      </div>
    `;
    forecastContainer.innerHTML += cardHtml;
  }
}

getWeatherBtn.addEventListener("click", displayWeather);
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        displayWeather();
    }
});

document.addEventListener("DOMContentLoaded", () => {
  if (lastCity) {
    cityInput.value = lastCity;
    displayWeather();
  }
});
