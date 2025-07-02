// Lesson 19 - События форм в JS

// input - событие ввода данных в поле ввода
// focus - событие фокуса на элементе
// blur - событие ухода с элемента
// change - событие изменения значения элемента
// submit - событие отправки формы

const form = document.querySelector("form");
const input = form.querySelector("input");

// input.addEventListener('input', (event) => {
//     // console.log(`Событие ввода данных: ${event}`);
//     // console.log(event);
//     console.log(event.data);

//     // Содержимое поля ввода
//     console.log(event.target.value);
//     //  Альтернативный вариант
//     console.log(input.value);
// });

// // Событие change
// input.addEventListener('change', (event) => {
//     console.log('Событие изменения значения элемента - change');
//     console.log(event.target.value);
// });

// // Событие отправки формы
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     console.log('Событие отправки формы');
//     // Изъять данные из поля ввода
//     console.log(input.value);
//     // Очистить поле ввода
//     // input.value = '';
//     alert("Запрашиваю погоду в городе " + input.value);
//     // Под формой добавить "Погода в городе Х -  ..."
//     const p = document.createElement('p');
//     p.textContent = `Погода в городе ${input.value} - ...`;
//     // Добавить элемент в DOM ПОСЛЕ формы
//     form.after(p);
// });

const marvelCharacters = [
  "Железный человек",
  "Капитан Америка",
  "Тор",
  "Халк",
  "Чёрная Вдова",
  "Человек-паук",
  "Доктор Стрэндж",
  "Алая Ведьма",
  "Соколиный глаз",
  "Чёрная пантера",
  "Звёздный Лорд",
  "Танос",
  "Локи",
  "Вижен",
  "Зимний солдат",
];

ulMarvelList = document.querySelector("#marvelList");

// По загрузке документа - добавим li в в ulMarvelList
document.addEventListener("DOMContentLoaded", () => {
  marvelCharacters.forEach((character) => {
    const li = document.createElement("li");
    li.textContent = character;
    ulMarvelList.append(li);
  });
});

// По событию input - мы очищаем li, Делаем поиск и выводим результат заново
input.addEventListener("input", (event) => {
  // Очищаем li
  
  // Делаем поиск
  const searchResult = marvelCharacters.filter((character) =>
    character.toLowerCase().includes(event.target.value.toLowerCase())
  );

  // Выводим результат
  // searchResult.forEach(character => {
  //     const li = document.createElement('li');
  //     li.textContent = character;
  //     ulMarvelList.append(li);
  // });
  // Вывод результата по таймауту 1000 мс
  setTimeout(() => {
    ulMarvelList.innerHTML = "";
    searchResult.forEach((character) => {
      const li = document.createElement("li");
      li.textContent = character;
      ulMarvelList.append(li);
    });
  }, 1000);
});
