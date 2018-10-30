
var cardList = [].slice.call(document.querySelectorAll(".card"));
var openCards = [];
var counter = 0;
var deck = document.querySelector(".deck"); 

start();

function start() {

    cardList = shuffle(cardList);

    deck.innerHTML = "";

    for (var i = 0; i < cardList.length; i++) {
        var card = cardList[i];
        clearCard(card);
        card.addEventListener("click", function(){
            showCard(this);
        });
        deck.appendChild(card);
    }
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

/*
 * set up the event listener for a card. If a card is clicked:
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
