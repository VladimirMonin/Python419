// Импорт функции greetByName из файла greet.js
// TODO - не работает, разобраться почему
import { greetByName } from './lesson_13.js';

let message = "Повторно объявленная переменная";

greetByName(message);

function addToShopList(item) {
  let shopList = [];
  shopList.push(item);
  return shopList;
}

function askUser() {
  let userAnswer = prompt("Введите название товара");
  return userAnswer;
}

function alertUser(shopList) {
  let message = `В списке покупок ${shopList.length} товаров: ${shopList.join(
    ", "
  )}`;
  alert(message);
}

let userAnswer = askUser();
let shopList = addToShopList(userAnswer);
alertUser(shopList);
