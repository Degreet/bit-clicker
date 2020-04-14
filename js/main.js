const msg = document.getElementById("msg")
const roundClicks = document.getElementById("round-clicks")
const recordClicks = document.getElementById("max-clicks")
const coin = document.getElementById("coin")

let timeGo = 0;
roundClicks.innerText = 0;

if (localStorage.getItem("record_click") !== null) {
    recordClicks.innerText = localStorage.getItem("record_click")
} else {
    recordClicks.innerText = 0
    localStorage.setItem("record_click", 0)
}

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
        }
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

play()