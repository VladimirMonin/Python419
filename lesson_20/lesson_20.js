let btn1 = document.getElementById("1");
let btn2 = document.getElementById("2");
let bntControl = document.getElementById("control");
let timeAwait = 5000;

// PRACTICE - Делаем по кнопке 1 имитацию синхронного ожидания - тестовая кнопка перестает работать. По кнопке 2 имитация асинх. запроса - ожидание - тестовая кнопка продолжает работать

document.addEventListener("DOMContentLoaded", () => {
  // Обработчик события клика по кнопке 1
  btn1.addEventListener("click", () => {
    btn1.disabled = true;
    const start = new Date().getTime();
    while (new Date().getTime() - start < timeAwait) {
        console.log("Синхрнное ожидание началось");
      // Этот цикл блокирует основной поток, имитируя синхронную операцию
    }
    console.log("Синхрнное ожидание закончилось");
    btn1.disabled = false;
  });
  // Обработчик события клика по кнопке 2
  btn2.addEventListener("click", () => {
    btn2.disabled = true;
    console.log("Асинхронное ожидание началось");
    setTimeout(() => {
      btn2.disabled = false;
      console.log("Асинхронное ожидание закончилось");
    }, timeAwait);
    
  });

  // Обработчик события клика по кнопке "Контроль"
  bntControl.addEventListener("click", () => {
    console.log("Тык!");
  });
});
