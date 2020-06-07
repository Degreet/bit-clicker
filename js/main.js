const msg = document.getElementById("msg")
const roundClicks = document.getElementById("round-clicks")
const recordClicks = document.getElementById("max-clicks")
const time = document.getElementById('timer')
const coinSound = new Audio('sound/coin.mp3')
const btnSound = new Audio('sound/btn.mp3')
const buttons = document.querySelectorAll('button')

let i
let timeGo = 0
let ifRecordUpBool = false
let autoclickerInterval
roundClicks.innerText = 0

if (!localStorage.moneyIconTheme) localStorage.moneyIconTheme = 'new'

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
if (!localStorage.roundTime) localStorage.roundTime = 30

document.getElementById('timer').innerHTML = +localStorage.roundTime

function play() {
    coin.onclick = function () {
        if (timeGo == 1) {
            coinSound.currentTime = 0
            coinSound.play()

            let clicks = roundClicks.innerHTML++ + 1
            resRoundClicks.innerText = roundClicks.innerText
            if (clicks > localStorage.getItem("record_click")) {
                localStorage.setItem("record_click", clicks)
                recordClicks.innerText = clicks
                ifRecordUp.innerText = `Вы побили рекорд! Теперь ваш рекорд это ${localStorage.record_click} очков!`
                ifRecordUpBool = true
            }

            if (clicks == 50 || clicks == 100 || clicks == 150 || clicks == 200 || clicks == 220 || clicks == 250 ||
                clicks == 300 || clicks == 350 || clicks == 400 || clicks == 450 || clicks == 500 || clicks == 550 ||
                clicks == 600 || clicks == 650 || clicks == 700 || clicks == 750 || clicks == 800 || clicks == 850 ||
                clicks == 900 || clicks == 950 || clicks == 1000 || clicks == 1100 || clicks == 1200 || clicks == 1300 ||
                clicks == 1400 || clicks == 1500 || clicks == 1600 || clicks == 1700 || clicks == 1800 || clicks == 1900 ||
                clicks == 2000 || clicks == 2100 || clicks == 2200 || clicks == 2300 || clicks == 2400 || clicks == 2500) {
                money.innerText++
                roundAddedMoney.innerText++
                localStorage.money = money.innerText
            }

            if (localStorage.x2Click) coin.click()
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
        document.querySelector('#main div img').className = 'active'
        roundStartText.className = 'active'
        setTimeout(() => roundStartText.className = 'unactive', 950)
        timer()
    } else {
        msg.innerText = "Игра уже идёт"
    }
}

function timer() {
    timeGo = 1
    time.innerHTML--
   
    if (time.innerHTML == 0) {
        msg.innerText = "Раунд окончен"
        timeGo = 0
        document.querySelector('#main div img').className = ''
        resultRoundHref.click()
        if (!ifRecordUpBool) ifRecordUp.innerText = "Вы не побили рекорд."
        ifRecordUpBool = false
        setTimeout(function(){}, 2000)
        time.innerText = localStorage.roundTime
        msg.innerText = 'Нажмите на кнопку "Играть", чтобы начать раунд'
    } else setTimeout(timer, 1000)
}

function clearProgress() {
    success = confirm("Вы действительно хотите сбросить прогресс?")
    if (success) {
        localStorage.clear()
        location.reload()
    } else msg.innerText = "Вы успешно отменили удаление данных"
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        btnSound.currentTime = 0
        btnSound.play()
    })
})

buyOneAutoclicker.onclick = () => {
    if (localStorage.autoclicker <= 30) {
        if (localStorage.money >= 10) {
            alert("Вы успешно преобрели 1 автокликер за 10 монет!")
            localStorage.money -= 10
            money.innerText -= 10
            localStorage.autoclicker++
        } else {
            alert("Недостаточно монет.")
        }
    } else alert("Вы преобрели максимальный уровень данного товара!")
}

buyFermMoney.onclick = () => {
    if (!localStorage.fermMoney) {
        if (localStorage.money >= 50) {
            alert("Вы успешно преобрели накопитель монет за 50 монет!")
            localStorage.money -= 50
            localStorage.fermMoney = true
        } else {
            alert("Недостаточно монет.")
        }
    } else alert("Вы уже преобрели данный товар!")
}

buyOneSecForRoundTime.onclick = () => {
    if (localStorage.roundTime <= 120) {
        if (localStorage.money >= 13) {
            alert("Вы успешно продлили раунд на 1 секунду за 13 монет!")
            localStorage.money -= 13
            money.innerText -= 13
            localStorage.roundTime++
            time.innerText = localStorage.roundTime
        } else {
            alert("Недостаточно монет.")
        }
    } else alert("Вы преобрели максимальный уровень данного товара!")
}

buyX2Click.onclick = () => {
    if (!localStorage.x2Click) {
        if (localStorage.money >= 45) {
            alert("Вы успешно преобрели X2 Click за 45 монет!")
            localStorage.money -= 45
            money.innerText -= 45
            localStorage.x2Click = true
        } else {
            alert("Недостаточно монет.")
        }
    } else alert("Вы уже преобрели X2 Click!")
}

novichokVDele.onclick = () => {
    if (localStorage.record_click >= 50 && !localStorage.novichokVDele) {
        alert("Вы успешно забрали 10 монет!")
        for (let i = 0; i < 10; i++) localStorage.money++
        money.innerText = localStorage.money
        localStorage.novichokVDele = true
    } else {
        if (localStorage.record_click <= 50) alert("У вас рекорд меньше чем требуется!")
        else if (localStorage.novichokVDele) alert("Вы уже получили эту награду!")
    }
}

novichokS2LvL.onclick = () => {
    if (localStorage.record_click >= 120 && !localStorage.novichokS2LvL) {
        alert("Вы успешно забрали 10 монет!")
        for (let i = 0; i < 10; i++) localStorage.money++
        money.innerText = localStorage.money
        localStorage.novichokS2LvL = true
    } else {
        if (localStorage.record_click <= 120) alert("У вас рекорд меньше чем требуется!")
        else if (localStorage.novichokS2LvL) alert("Вы уже получили эту награду!")
    }
}

uzheNeNovichok.onclick = () => {
    if (localStorage.record_click >= 300 && !localStorage.uzheNeNovichok) {
        alert("Вы успешно забрали 10 монет!")
        for (let i = 0; i < 10; i++) localStorage.money++
        money.innerText = localStorage.money
        localStorage.uzheNeNovichok = true
    } else {
        if (localStorage.record_click <= 300) alert("У вас рекорд меньше чем требуется!")
        else if (localStorage.uzheNeNovichok) alert("Вы уже получили эту награду!")
    }
}

teperProfi.onclick = () => {
    if (localStorage.record_click >= 500 && !localStorage.teperProfi) {
        alert("Вы успешно забрали 15 монет!")
        for (let i = 0; i < 15; i++) localStorage.money++
        money.innerText = localStorage.money
        localStorage.teperProfi = true
    } else {
        if (localStorage.record_click <= 500) alert("У вас рекорд меньше чем требуется!")
        else if (localStorage.teperProfi) alert("Вы уже получили эту награду!")
    }
}

mostrWinner.onclick = () => {
    if (localStorage.record_click >= 2000 && !localStorage.mostrWinner) {
        alert("Вы успешно забрали 20 монет!")
        for (let i = 0; i < 20; i++) localStorage.money++
        money.innerText = localStorage.money
        localStorage.mostrWinner = true
    } else {
        if (localStorage.record_click <= 2000) alert("У вас рекорд меньше чем требуется!")
        else if (localStorage.mostrWinner) alert("Вы уже получили эту награду!")
    }
}

master.onclick = () => {
    if (localStorage.record_click >= 1000 && !localStorage.master) {
        alert("Вы успешно забрали 15 монет!")
        for (let i = 0; i < 15; i++) localStorage.money++
        money.innerText = localStorage.money
        localStorage.master = true
    } else {
        if (localStorage.record_click <= 1000) alert("У вас рекорд меньше чем требуется!")
        else if (localStorage.master) alert("Вы уже получили эту награду!")
    }
}

korol.onclick = () => {
    if (localStorage.record_click >= 1500 && !localStorage.korol) {
        alert("Вы успешно забрали 15 монет!")
        for (let i = 0; i < 15; i++) localStorage.money++
        money.innerText = localStorage.money
        localStorage.korol = true
    } else {
        if (localStorage.record_click <= 1500) alert("У вас рекорд меньше чем требуется!")
        else if (localStorage.korol) alert("Вы уже получили эту награду!")
    }
}

skillovik.onclick = () => {
    if (localStorage.record_click >= 2500 && !localStorage.skillovik) {
        alert("Вы успешно забрали 25 монет!")
        for (let i = 0; i < 25; i++) localStorage.money++
        localStorage.skillovik = true
    } else {
        if (localStorage.record_click <= 2500) alert("У вас рекорд меньше чем требуется!")
        else if (localStorage.skillovik) alert("Вы уже получили эту награду!")
    }
}

newMoneyIcon.onclick = () => {
    localStorage.moneyIconTheme = 'new'
    if (oldMoneyIcon.hasAttribute('checked')) {
        oldMoneyIcon.removeAttribute('checked')
        activeOldMoneyIcon.classList.remove('active')
    }

    activeNewMoneyIcon.classList.add('active')
    newMoneyIcon.setAttribute('checked', '')
}

oldMoneyIcon.onclick = () => {
    localStorage.moneyIconTheme = 'old'
    if (newMoneyIcon.hasAttribute('checked')) {
        newMoneyIcon.removeAttribute('checked')
        activeNewMoneyIcon.classList.remove('active')
    }

    activeOldMoneyIcon.classList.add('active')
    oldMoneyIcon.setAttribute('checked', '')
}

closeRes.onclick = () => roundAddedMoney.innerText = 0
setInterval(() => {
    localStorageAutoClickerCount.innerText = +localStorage.autoclicker + 1
    localStorageRoundCountOld.innerText = localStorageRoundCount.innerText = +localStorage.roundTime
    localStorageRoundCountNew.innerText = +localStorage.roundTime + 1
    coin.src = localStorage.moneyIconTheme == 'new' ? 'img/coin.svg' : 'img/coin.png'
    money.innerText = localStorage.money

    if (localStorage.moneyIconTheme == 'new') {
        if (oldMoneyIcon.hasAttribute('checked')) {
            oldMoneyIcon.removeAttribute('checked')
            activeOldMoneyIcon.classList.remove('active')
        }

        activeNewMoneyIcon.classList.add('active')
        newMoneyIcon.setAttribute('checked', '')
    } else if (localStorage.moneyIconTheme == 'old') {
        if (newMoneyIcon.hasAttribute('checked')) {
            newMoneyIcon.removeAttribute('checked')
            activeNewMoneyIcon.classList.remove('active')
        }
    
        activeOldMoneyIcon.classList.add('active')
        oldMoneyIcon.setAttribute('checked', '')
    }

    if (!localStorage.x2Click) buyX2Click.innerText = 'Купить за 45 монет'
    else {
        buyX2Click.innerText = 'Куплено'
        buyX2Click.className = 'btn btn-outline-danger mt-3'
    }

    if (!localStorage.fermMoney) buyFermMoney.innerText = 'Купить за 50 монет'
    else {
        buyFermMoney.innerText = 'Куплено'
        buyFermMoney.className = 'btn btn-outline-danger mt-3'
    }

    if (localStorage.roundTime <= 120) buyOneSecForRoundTime.innerText = 'Купить за 13 монет'
    else {
        buyOneSecForRoundTime.innerText = 'Куплено'
        buyOneSecForRoundTime.className = 'btn btn-outline-danger mt-3'
    }

    if (localStorage.autoclicker <= 30) buyOneAutoclicker.innerText = 'Купить за 10 монет'
    else {
        buyOneAutoclicker.innerText = 'Куплено'
        buyOneAutoclicker.className = 'btn btn-outline-danger mt-3'
    }

    if (localStorage.record_click >= 50 && !localStorage.novichokVDele) {
        novichokVDele.innerText = 'Забрать 10 монет'
        novichokVDele.className = 'btn btn-outline-primary mt-3'
    } else {
        if (localStorage.record_click <= 50) {
            novichokVDele.innerText = 'В процессе'
            novichokVDele.className = 'btn btn-outline-warning mt-3'
        } else if (localStorage.novichokVDele) {
            novichokVDele.innerText = 'Получено'
            novichokVDele.className = 'btn btn-outline-danger mt-3'
        }
    }

    if (localStorage.record_click >= 120 && !localStorage.novichokS2LvL) {
        novichokS2LvL.innerText = 'Забрать 10 монет'
        novichokS2LvL.className = 'btn btn-outline-primary mt-3'
    } else {
        if (localStorage.record_click <= 120) {
            novichokS2LvL.innerText = 'В процессе'
            novichokS2LvL.className = 'btn btn-outline-warning mt-3'
        } else if (localStorage.novichokS2LvL) {
            novichokS2LvL.innerText = 'Получено'
            novichokS2LvL.className = 'btn btn-outline-danger mt-3'
        }
    }

    if (localStorage.record_click >= 300 && !localStorage.uzheNeNovichok) {
        uzheNeNovichok.innerText = 'Забрать 10 монет'
        uzheNeNovichok.className = 'btn btn-outline-primary mt-3'
    } else {
        if (localStorage.record_click <= 300) {
            uzheNeNovichok.innerText = 'В процессе'
            uzheNeNovichok.className = 'btn btn-outline-warning mt-3'
        } else if (localStorage.uzheNeNovichok) {
            uzheNeNovichok.innerText = 'Получено'
            uzheNeNovichok.className = 'btn btn-outline-danger mt-3'
        }
    }

    if (localStorage.record_click >= 500 && !localStorage.teperProfi) {
        teperProfi.innerText = 'Забрать 15 монет'
        teperProfi.className = 'btn btn-outline-primary mt-3'
    } else {
        if (localStorage.record_click <= 500) {
            teperProfi.innerText = 'В процессе'
            teperProfi.className = 'btn btn-outline-warning mt-3'
        } else if (localStorage.teperProfi) {
            teperProfi.innerText = 'Получено'
            teperProfi.className = 'btn btn-outline-danger mt-3'
        }
    }

    if (localStorage.record_click >= 1500 && !localStorage.korol) {
        korol.innerText = 'Забрать 15 монет'
        korol.className = 'btn btn-outline-primary mt-3'
    } else {
        if (localStorage.record_click <= 1500) {
            korol.innerText = 'В процессе'
            korol.className = 'btn btn-outline-warning mt-3'
        } else if (localStorage.korol) {
            korol.innerText = 'Получено'
            korol.className = 'btn btn-outline-danger mt-3'
        }
    }

    if (localStorage.record_click >= 1000 && !localStorage.master) {
        master.innerText = 'Забрать 15 монет'
        master.className = 'btn btn-outline-primary mt-3'
    } else {
        if (localStorage.record_click <= 1000) {
            master.innerText = 'В процессе'
            master.className = 'btn btn-outline-warning mt-3'
        } else if (localStorage.master) {
            master.innerText = 'Получено'
            master.className = 'btn btn-outline-danger mt-3'
        }
    }

    if (localStorage.record_click >= 2000 && !localStorage.mostrWinner) {
        mostrWinner.innerText = 'Забрать 20 монет'
        mostrWinner.className = 'btn btn-outline-primary mt-3'
    } else {
        if (localStorage.record_click <= 2000) {
            mostrWinner.innerText = 'В процессе'
            mostrWinner.className = 'btn btn-outline-warning mt-3'
        } else if (localStorage.mostrWinner) {
            mostrWinner.innerText = 'Получено'
            mostrWinner.className = 'btn btn-outline-danger mt-3'
        }
    }

    if (localStorage.record_click >= 2500 && !localStorage.skillovik) {
        skillovik.innerText = 'Забрать 25 монет'
        skillovik.className = 'btn btn-outline-primary mt-3'
    } else {
        if (localStorage.record_click <= 2500) {
            skillovik.innerText = 'В процессе'
            skillovik.className = 'btn btn-outline-warning mt-3'
        } else if (localStorage.skillovik) {
            skillovik.innerText = 'Получено'
            skillovik.className = 'btn btn-outline-danger mt-3'
        }
    }
}, 50)

if (localStorage.fermMoney) setInterval(() => localStorage.money++, 12000)
play()