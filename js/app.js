var cardList = [].slice.call(document.querySelectorAll(".card"));
var openCards = [];
var matchedCards = 0;
var counter = 0;
var startTime;
var endTime;
var stars = document.querySelectorAll(".fa-star");
var stopWatch = document.getElementById("stopWatch"),
    seconds = 0, minutes = 0, hours = 0,
    time;

document.getElementById("restart").addEventListener("click", function () {
    restartGame();
    document.getElementById("youWin").classList.toggle("hide");
    document.getElementById("deck").classList.toggle("hide");
});

document.getElementById("btn-newgame").addEventListener("click", function () {
    startGame();
    document.getElementById("newgame").classList.toggle("hide");
});

function startGame() {

    matchedCards = 0;

    startTime = new Date().getTime();

    cardList = shuffle(cardList);

    var moves = document.querySelector(".moves");
    moves.innerHTML = counter;

    var deck = document.getElementById("deck");
    deck.innerHTML = "";

    document.getElementById("starsScore").innerHTML = "";

    for (var s of stars) {
        s.classList.remove("hide");
    }

    for (var i = 0; i < cardList.length; i++) {
        var card = cardList[i].cloneNode(true);
        clearCard(card);
        card.addEventListener("click", showCard);
        deck.appendChild(card);
    }

    var btRestart = document.querySelector(".restart");
    btRestart.addEventListener("click", function () {
        restartGame();
    });

    stopTimer();
    clearTimer();
    timer();

}

function restartGame() {
    counter = 0;
    openCards = [];
    document.getElementById("score-panel").classList.remove("hide");
    startGame();
}

function showCard(el) {
    this.classList.add("open", "show");
    addToOpen(this);
}

function clearCard(card) {
    card.classList.remove("match", "open", "show");
}

function addCounter() {
    counter++;
    var moves = document.querySelector(".moves");
    moves.innerHTML = counter;

    hideStars();
}

function hideStars() {
    if (counter > 15) {
        stars[0].classList.add("hide");
    }
    if (counter > 20) {
        stars[1].classList.add("hide");
    }
    if (counter > 25) {
        stars[2].classList.add("hide");
    }
}

function doNotMatch(el, last) {
    clearCard(last);
    clearCard(el);
}

function matchCards(el, last) {
    el.classList.add("match");
    last.classList.add("match");
    matchedCards++;
    console.log(cardList.length, matchedCards * 2);
    el.removeEventListener("click", showCard);
    last.removeEventListener("click", showCard);

    if (cardList.length == matchedCards * 2) {
        setTimeout(function () {
            endGame();
        }, 1000);
    }
}

function addToOpen(el) {

    if (openCards.length > 0) {

        var last = openCards[openCards.length - 1];

        if (el.id != last.id) {

            if (last.dataset.cardName == el.dataset.cardName) {
                matchCards(el, last);
                openCards = [];
            } else {
                openCards.pop();
                setTimeout(function () {
                    doNotMatch(el, last);
                }, 1000);
            }

            addCounter();

        }

    } else {
        openCards.push(el);
    }

}

function elapsedTime() {

    var distance = new Date().getTime() - startTime;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days} days ${hours}h ${minutes}min ${seconds}s`;

}

function endGame() {
    var deck = document.getElementById("deck");
    deck.classList.toggle("hide");

    var youWin = document.getElementById("youWin");
    youWin.classList.toggle("hide");

    document.getElementById("elapsed").innerHTML = elapsedTime();

    document.getElementById("score-panel").classList.toggle("hide");

    var score = document.querySelector(".stars").cloneNode(true);

    document.getElementById("starsScore").appendChild(score);

    stopTimer();

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*timer https://jsfiddle.net/Daniel_Hug/pvk6p/ */

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    stopWatch.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    time = setTimeout(add, 1000);
}

function stopTimer() {
    clearTimeout(time);
}

function clearTimer() {
    stopWatch.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;    
}


