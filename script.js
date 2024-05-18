const form = document.querySelector('form');
const log = document.querySelector('#log');

let cats;
let portion;
let bowl;
let m;
let eatTime;
let refillTime;
let time = 0;
let catNumbers = [];

function logAction(action, catNumber = null) {
    let message;
    switch (action) {
        case 'wait':
        message = catNumber ? `Котик под номером ${catNumber} подошел к миске.` : 'Котики ждут, пока бабушка наполнит миску.';
        break;
        case 'eat':
        message = catNumber ? `Котик под номером ${catNumber} начал есть.` : 'Котики едят.';
        break;
        case 'finish':
        message = catNumber ? `Котик под номером ${catNumber} отошел от миски.` : 'Все котики отошли от миски.';
        break;
        case 'refill':
        message = 'Бабушка наполняет миску.';
        break;
        default:
        break;
    }
    const logItem = document.createElement('p'); //добавление в html новой строчки с логом
    logItem.textContent = `${time} с: ${message}`; // заполнение лога информацией о состоянии и о прошедшем времени
    log.appendChild(logItem); // добавление в список логов
}

function fillBowl(catNumber) { 
    logAction('refill');//вывод лога о заполнении миски
    setTimeout(() => {
        bowl = m;
        logAction('wait'); // вывод лога об одижании наполнения миски
        logAction('eat', catNumber); // вывод лога и задержка времени для кота, ожидающего еду
        setTimeout(() => {
            bowl -= portion; // кот ест свою порцию
            logAction('finish', catNumber); // вывод о завершении перекус
        }, eatTime * 1000);
        time += eatTime;
        nextCat();
    }, refillTime * 1000);
    time += refillTime;
}

function nextCat() { //обработка действия кота
    if (catNumbers.length === 0) { // проверка на конец массива
        console.log(`Все котики накормлены. Всего затрачено времени: ${time} с.`);
        return;
    }
    const catNumber = catNumbers[0];
    if (bowl >= portion) { // у кота есть достаточно еды в миске
        logAction('eat', catNumber); // вывод лога о перекусе кота
        setTimeout(() => {
          bowl -= portion; // кот ест свою порцию
          logAction('finish', catNumber); // вывод о завершении перекуса
          nextCat(); // переход к следующему коту
        }, eatTime * 1000);
        time += eatTime; // добавление времени к общему количеству
    } else {
        logAction('wait', catNumber); // вывод лога об ожидании наполнения миски
        fillBowl(catNumber); //функция для заполнения миски бабушкой
    } 
    catNumbers.shift();
}


form.addEventListener('submit', (e) => { //после нажатия кнопки получить значения из форм
    e.preventDefault();
    cats = parseInt(document.querySelector('#cats').value);
    portion = parseInt(document.querySelector('#portions').value);
    bowl = parseInt(document.querySelector('#bowl').value);
    eatTime = parseInt(document.querySelector('#eatTime').value);
    refillTime = parseInt(document.querySelector('#refillTime').value);
    m = bowl;
    for (let i = 1; i <= cats; i++) {
        catNumbers.push(i);
    }
    nextCat();
});