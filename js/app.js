var cardList = [].slice.call(document.querySelectorAll(".card"));
var openCards = [];
var matchedCards = 0;
var counter = 0;
var startTime;
var endTime;

document.getElementById("restart").addEventListener("click",function(){
    restartGame();
    document.getElementById("youWin").classList.toggle("hide");
    document.getElementById("deck").classList.toggle("hide");
});

document.getElementById("btn-newgame").addEventListener("click", function () {
    startGame();
    document.getElementById("newgame").classList.toggle("hide");
});

function startGame() {

    startTime = new Date().getTime();
    
    cardList = shuffle(cardList);

    var moves = document.querySelector(".moves");    
    moves.innerHTML = counter;    
    
    var deck = document.getElementById("deck"); 
    deck.innerHTML = "";

    for (var i = 0; i < cardList.length; i++) {
        var card = cardList[i].cloneNode(true);
        clearCard(card);
        card.addEventListener("click", function(){
            showCard(this);
        });
        deck.appendChild(card);
    }

    var btRestart = document.querySelector(".restart");
    btRestart.addEventListener("click",function(){
        restartGame();
    });

}

function restartGame(){
    counter = 0;
    openCards = [];    
    document.getElementById("score-panel").classList.remove("hide");
    startGame();
}

function showCard(el){
    el.classList.add("open","show");
    addToOpen(el);    
}

function clearCard(card){
    card.classList.remove("match", "open", "show");
}

function addCounter(){
    counter++;
    var moves = document.querySelector(".moves"); 
    moves.innerHTML = counter;
}

function doNotMatch(el,last){
    clearCard(last);
    clearCard(el);
}

function matchCards(el, last) {
    el.classList.add("match");
    last.classList.add("match");
    matchedCards++;
    if (cardList.length == matchedCards * 2) {
        endGame();
    }
}

function addToOpen(el) {
        
    if (openCards.length > 0) {

        var last = openCards[openCards.length - 1];                

        if (last.dataset.cardName == el.dataset.cardName){
            matchCards(el,last);
            openCards = [];
        } else {
            openCards.pop();    
            setTimeout(function () {
                doNotMatch(el, last);
            },1000);
        } 

        addCounter();

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