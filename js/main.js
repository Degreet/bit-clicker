const msg = document.getElementById("msg")
const roundClicks = document.getElementById("round-clicks")
const recordClicks = document.getElementById("max-clicks")
const coin = document.getElementById("coin")

let i
let timeGo = 0
let autoclickerInterval
roundClicks.innerText = 0

if (localStorage.getItem("record_click")) recordClicks.innerText = localStorage.getItem("record_click")
else {
    recordClicks.innerText = 0
    localStorage.setItem("record_click", 0)
}

if (localStorage.money) money.innerText = localStorage.money
else {
    money.innerText = 0
    localStorage.money = money.innerText
}

if (!localStorage.autoclicker) localStorage.autoclicker = 0

function play() {
    coin.onclick = function () {
        if (timeGo !== 1) {
            msg.innerText = 'Нажмите на кнопку "Начать" чтобы играть'
        } else {
            let clicks = roundClicks.innerHTML++ + 1
            if (clicks > localStorage.getItem("record_click")) {
                localStorage.setItem("record_click", clicks)
                recordClicks.innerText = clicks
            }

            if (clicks == 10 || clicks == 20 || clicks == 30 || clicks == 50 || clicks == 80 || clicks == 100 || clicks == 120 || clicks == 150 || clicks == 180 || clicks == 200 || clicks == 250 || clicks == 300) {
                money.innerText++
                localStorage.money = money.innerText
            }
        }
    }

    if (localStorage.autoclicker >= 1) {
        if (autoclickerInterval) clearInterval(autoclickerInterval)
        autoclickerInterval = setInterval(() => {
            i = 0
            while (i < localStorage.autoclicker) {
                coin.click()
                i++
            }
        }, 2000)
        delete i
    }
}

function startGame() {
    if (timeGo !== 1) {
        roundClicks.innerText = 0
        timer()
    } else {
        msg.innerText = "Игра уже идёт"
    }
}

function timer() {
    timeGo = 1
    let time = document.getElementById('timer')
    time.innerHTML--
   
    if (time.innerHTML == 0) {
        msg.innerText = "Раунд окончен"
        timeGo = 0
        setTimeout(function(){}, 1000)
        time.innerText = 30
    } else {
        setTimeout(timer, 1000)
    }
}

function clearProgress() {
    success = confirm("Вы действительно хотите сбросить прогресс?")
    if (success) {
        localStorage.clear()
        location.reload()
    } else {
        msg.innerText = "Вы успешно отменили удаление данных"
    }
}

buyOneAutoclicker.onclick = () => {
    if (localStorage.money >= 5) {
        alert("Вы успешно преобрели 1 автокликер за 5 монет!")
        localStorage.money -= 5
        money.innerText -= 5
        localStorage.autoclicker++
        location.reload()
    } else {
        alert("Недостаточно монет.")
    }
}

setInterval(() => localStorageAutoClickerCount.innerText = +localStorage.autoclicker + 1, 50)
play()