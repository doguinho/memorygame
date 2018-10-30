
var cardList = [].slice.call(document.querySelectorAll(".card"));
var openCards = [];
var counter = 0;

startGame();

function startGame() {

    cardList = shuffle(cardList);
    var deck = document.querySelector(".deck"); 
    deck.innerHTML = "";

    for (var i = 0; i < cardList.length; i++) {
        var card = cardList[i];
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

function addToOpen(el) {
        
    if (openCards.length > 0) {

        var last = openCards[openCards.length - 1];                

        if (last.dataset.cardName == el.dataset.cardName){
            matchCards(el,last);
            openCards = [];
        } else {
            openCards.pop();    
            clearCard(last);
            clearCard(el);
        } 

        addCounter();

    } else {
        openCards.push(el);
    }
    
}

function matchCards(el,last){
    el.classList.add("match");
    last.classList.add("match");
    cardList.pop();
    cardList.pop();    
    if (cardList.length == 0) {
        endGame();
    }
}

function endGame() {
    var deck = document.querySelector(".deck");
    deck.classList.add("hide");

    var youWin = document.getElementById("youWin");
    youWin.classList.remove("hide");
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