// Работа с куками

// Кука - живет в document.cookie - отправляется с КАЖДЫМ запросом к этому сайту в заголовках запроса
// Удобно для хранения небольших данных, которые не должны быть доступным для всех - доступ, возможно корзина, авторизация и т.п.

// В плане данных - это строка. И нет опции получить куку по названию. Берите строку и разбирайте сами!)))

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      // Удаляем пробелы в начале
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      // Если кука начинается с искомого имени
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null; // Кука не найдена
}

// Для установки куки вы присваиваете строку свойству document.cookie. Важно понимать, что это не перезаписывает все существующие куки, а добавляет или обновляет только ту куку, которую вы указываете.

// Установка простой сессионной куки (удаляется при закрытии браузера)
// document.cookie = "username=Иваныч";

// Установка куки со сроком действия (например, на 7 дней)
const d = new Date();
d.setTime(d.getTime() + 1 * 1 * 1 * 60 * 1000); // 7 дней в миллисекундах
const expires = "expires=" + d.toUTCString();
document.cookie = "theme=dark;" + expires + ";path=/";

// Установка куки с атрибутами Secure и SameSite
document.cookie =
  "username=Сергеич; expires=" +
  d.toUTCString() +
  "; path=/; Secure; SameSite=Lax";
