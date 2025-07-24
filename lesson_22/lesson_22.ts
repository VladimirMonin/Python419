// TypeScript - надмножество JavaScript
// Это означает что любой код JS - валиден в TS
// number, string, boolean, void, undefined, null, bigint, symbol
// void - функция ничего не возвращает
// Двойные значения можно задать через | (вертикальная черта)
function SimpleSum (a: number, b: number): number {
    return a + b
}

console.log(SimpleSum(1, 2))

function getMessage (message: string): void {
    console.log(message)
}
getMessage("Привет от TypeScript")

// Массив в TS
let numsArray: number[] = [1, 2, 3, 4, 5]
let strArray: string[] = ["a", "b", "c"]
let mixedArray: (number | string)[] = [1, "a", 2, "b"]

let randomArray = [1, "a", true, null, undefined]

function iterConsoleLog(array: unknown[]): void {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i])
    }
}

iterConsoleLog(mixedArray)

// // Описываем "чертёж" для объекта пользователя
interface User {
    name: string;
    age: number;
    isActivated: boolean;
    // Знак ? делает свойство необязательным
    nickname?: string; 
}

// Создаём объект, который соответствует нашему чертежу
const sergey: User = {
    name: "Сергей",
    age: 32,
    isActivated: true
};

// const badData: User = {
//     name: 101,
//     age: "32",
//     isActivated: "true"
// }

/**
 * Функция для вывода имени пользователя
 *
 * @param {User} user - объект пользователя
 * @param {string} [message] - сообщение для пользователя
 */
function printUser(user: User, message?: string): void {
    console.log(`${user.name}, ваше сообщение: ${message}`)
}


printUser(sergey, "Привет от TypeScript")
// printUser(badData)

// Найдем элемент поля ввода id inputText
let inputText = document.getElementById("inputText") as HTMLInputElement
inputText.value = "Привет от TypeScript"


/**
 * Функция для вывода строки в нижнем регистре
 *
 * @param {unknown} str
 */
function logUnknowString(str: unknown): void {
    if (typeof str === "string") {
        console.log(str.toLowerCase())}}


/**
 * Формирует полное имя пользователя из составных частей.
 * Фамилия и имя являются обязательными, отчество - опционально.
 *
 * @param lastName - Фамилия пользователя.
 * @param firstName - Имя пользователя.
 * @param [middleName] - Отчество пользователя (необязательный параметр).
 * @returns Полностью сформированную строку с ФИО.
 * @example
 * formatUserName("Иванов", "Иван", "Иванович") // "Иванов Иван Иванович"
 * formatUserName("Петров", "Петр") // "Петров Петр"
 */
function formatUserName(lastName: string, firstName: string, middleName?: string): string {
    if (middleName) {
        return `${lastName} ${firstName} ${middleName}`;
    }
    return `${lastName} ${firstName}`;
}

// По загрузке документа - просим API ключ Mistral AI
document.addEventListener("DOMContentLoaded", () => {
    // Проверим есть ли он в LocalStorage
    const apiKey = localStorage.getItem("apiKey");
    // Если его нет, просим и записываем
    if (!apiKey) {
        const userApiKey = prompt("Введите ваш API ключ Mistral AI");
        if (userApiKey) {
            localStorage.setItem("apiKey", userApiKey);
            alert("Ключ сохранен");
        } else {
            alert("Ключ не сохранен");
            return;
        }}
    else {
        console.log("Ключ взят из LocalStorage")
    }});
