var colorsRu = ["Синий", "Красный", "Зеленый", "Черный"]
var colorsEn = ["Blue", "Red", "Green", "Black"]
var mode = 1
var GameTimer = 60
var startGameTimer = 3

var correctImg = document.getElementById("checkmark")
var wrongImg = document.getElementById("wrong")
var scoreHTML = document.getElementById("score")
var multiHTML = document.getElementById("multi")
var colorWord_1 = document.getElementById("color1")
var colorWord_2 = document.getElementById("color2")

var correctCount = 0
var wrongCount = 0
var score = 0
var strik = 0
var lvl = 0
var countTrain = 0

document.addEventListener("keydown", function(event) {
    if (event.code == "ArrowLeft") {
    event.preventDefault()
    document.getElementById("No").click()
    }
})
document.addEventListener("keydown", function(event) {
    if (event.code == "ArrowRight") {
    event.preventDefault()
    document.getElementById("Yes").click()
    }
})
document.addEventListener("keydown", function(event) {
    if (event.code == "Escape") {
    event.preventDefault()
    this.location.reload()
    }
})


function help() {
    document.getElementById("startGameBtns").style.display = "none"
    document.getElementById("helpText").style.display = "flex"
    document.getElementById("helpText").setAttribute("onclick", "stopHelp()")
}
function stopHelp() {
    document.getElementById("startGameBtns").style.display = "block"
    document.getElementById("helpText").style.display = "none"
    document.getElementById("helpText").removeAttribute("onclick")
}
function startGame() {
    document.getElementById("timer").style.display = "flex"
    document.getElementById("game_box").style.display = "none"
    document.getElementById("startGameBtns").style.display = "none"
    interval1 = setInterval(timer1, 1000)
}
function Game() {
    document.getElementById("game_box").style.display = "block"
    document.getElementById("game_menu").style.display = "flex"
    document.getElementById("timer").style.display = "none"
    colorWord_1.classList.add("firstLoadColorWord")
    colorWord_1.innerHTML = ""
    colorWord_2.classList.add("firstLoadColorWord")
    colorWord_2.innerHTML = ""
    setTimeout(function() {
        colorWord_1.classList.remove("firstLoadColorWord")
        colorWord_2.classList.remove("firstLoadColorWord")
        interval2 = setInterval(timer2, 1000)
        reset()
    },800)
}
function startTraining(){
    document.getElementById("game_box").style.display = "block"
    document.getElementById("startGameBtns").style.display = "none"
    document.getElementById("game_menu").style.display = "none"
    mode = 2
    colorWord_1.classList.add("firstLoadColorWord")
    colorWord_1.innerHTML = ""
    colorWord_2.classList.add("firstLoadColorWord")
    colorWord_2.innerHTML = ""
    setTimeout(function() {
        colorWord_1.classList.remove("firstLoadColorWord")
        colorWord_2.classList.remove("firstLoadColorWord")
        reset()
    },800)
}


function checkAnsw(answer, correctAnswer) {
    document.getElementById("No").removeAttribute("onclick")
    document.getElementById("Yes").removeAttribute("onclick")
    if(answer===correctAnswer) {
        correctCount++
        strik++
        if(strik == 3 && lvl < 4) {
            lvl++
            strik=0
        }
        score = score + 200 * (1 + lvl * 0.05)
        correctImg.classList.add("fageScale")
    }
    else {
        wrongCount++
        strik = 0
        if(lvl != 0)
        lvl--
        (score - 200 > 0) ? score-=200 : score = 0
        wrongImg.classList.add("fageWiggle")
    }
    setTimeout(function() {
        correctImg.classList.remove("fageScale")
        wrongImg.classList.remove("fageWiggle")
        if(mode == 2) {
            var btn = document.getElementById(answer);
            if(answer == "Yes") {
                btn.setAttribute("class","answ")
                btn.removeAttribute("onclick")
            }
            if(answer == "No") {
                btn.setAttribute("class","answleft")
                btn.removeAttribute("onclick")
            }
            countTrain++
            if(countTrain == 3) {
                mode = 1
                setTimeout(function() {
                    correctCount = 0
                    wrongCount = 0
                    score = 0
                    strik = 0
                    lvl = 0
                    scoreHTML.innerHTML = score
                    multiHTML.innerHTML = "x"+(1+lvl*0.05)
                    startGame()
                }, 170)
            }
        }
        scoreHTML.innerHTML = score
        multiHTML.innerHTML = "x"+(1+lvl*0.05)
        if(GameTimer==0) {
            alert("Игра окончена. Очки: " + score + "\nСтатистика: Правильные ответы = "+correctCount+"; Неправильные ответы = "+ wrongCount + "\nТочность ответов: "+ parseInt(10000*correctCount/(correctCount+wrongCount))/100 + "%")
            location.reload()
        }
        reset()
    }, 400)
}


function reset() {
    var random1 = Math.floor(Math.random() * 2)
    var random2 = Math.floor(Math.random() * 4)
    var answ = ""
    var timeamin = 0
    if(correctCount+wrongCount!=0) {
        colorWord_1.classList.add("loadColorWord")
        colorWord_2.classList.add("loadColorWord")
        timeamin = 400
    }
    setTimeout(function() {
        colorWord_1.classList.remove("loadColorWord")
        colorWord_2.classList.remove("loadColorWord")
        if(random1==0) {
            answ = "Yes"
            colorsRu[random2]
            colorWord_1.innerHTML = colorsRu[random2]
            colorWord_2.style.color = colorsEn[random2]
            random2 = Math.floor(Math.random() * 4)
            colorWord_2.innerHTML = colorsRu[random2]
            random2 = Math.floor(Math.random() * 4)
            colorWord_1.style.color = colorsEn[random2]
        }
        else {
            answ = "No"
            colorWord_1.innerHTML = colorsRu[random2]
            var random3 = Math.floor(Math.random() * 4)
            while(random2==random3) {
                random3 = Math.floor(Math.random() * 4)
            }
            colorWord_2.style.color = colorsEn[random3]
            random2 = Math.floor(Math.random() * 4)
            colorWord_2.innerHTML = colorsRu[random2]
            random2 = Math.floor(Math.random() * 4)
            colorWord_1.style.color = colorsEn[random2]
        }
        if(mode == 1) {
        addClick("Yes", answ)
        addClick("No", answ)
        }
        else {
            if(answ == "Yes") addClick("Yes", answ)
            if(answ == "No") addClick("No", answ)
        }
    }, timeamin)
}


function addClick(answer, correctAnswer) {
    var btn = document.getElementById(answer)
    if(mode == 2 && answer == "No") btn.setAttribute("class","trainanswleft")
    if(mode == 2 && answer == "Yes") btn.setAttribute("class","trainansw")
    let onclick = "checkAnsw('".concat(answer,"','",correctAnswer,"')")
    btn.setAttribute("onclick", onclick)
}


function timer1() {
    document.getElementById("timer").innerHTML = startGameTimer
    document.getElementById("timer").classList.add("fadeAwayTimer")
    setTimeout(function() {
        document.getElementById("timer").classList.remove("fadeAwayTimer")
    }, 950)
    if(startGameTimer==0) {
        clearInterval(interval1)
        Game()
    }
    startGameTimer--
}


function timer2() {
    document.getElementById("time").innerHTML = GameTimer
    if(GameTimer==0) {
        clearInterval(interval2)
    }
    else GameTimer--
}