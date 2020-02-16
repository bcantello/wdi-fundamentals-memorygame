let cards = [
    {
        rank: 'queen',
        suit: 'hearts',
        cardImage: 'images/queen-of-hearts.png'
    },
    {
        rank: 'queen',
        suit: 'diamonds',
        cardImage: 'images/queen-of-diamonds.png'
    },
    {
        rank: 'king',
        suit: 'hearts',
        cardImage: 'images/king-of-hearts.png'
    },
    {
        rank: 'king',
        suit: 'diamonds',
        cardImage: 'images/king-of-diamonds.png'
    }
];

let cardsInPlay = [];
let randomOrder = [];
let totalMatches = 0;
let totalAttempts = 0;
let matchStreak = 0;
let score = 0;
let matchRate = 0 + "\%";
let matchState = null;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateRandomCardOrder() {
    while (randomOrder.length < cards.length) {
        let randomInt = getRandomInt(cards.length);
        if (randomOrder.includes(randomInt) !== true) {
            randomOrder.push(randomInt);
        }
    }
}

function createBoard() {
    for (let i = 0; i < randomOrder.length; i++) {
        let cardElement = document.createElement('img');
        cardElement.setAttribute('src', 'images/cardBack.png');
        cardElement.setAttribute('data-id', randomOrder[i]);
        cardElement.addEventListener('click', flipCard);
        document.getElementById('game-board').appendChild(cardElement);
    }
}

function checkForMatch() {
    if (cardsInPlay[0] === cardsInPlay[1]) {
        totalMatches++;
        matchStreak++;
        score += (5 + matchStreak * 5);
        updateTable(true);
        specialSurprise();
        insertMessage("response-message", "You found a match! Can you find " +
            (matchStreak + 1) + " in a row? ");
        setTimeout(function () {
            resetGame();
        }, 1500);
    } else {
        matchStreak = 0;
        updateTable(false);
        insertMessage("response-message", "Shoot! You didn't find a match. " +
            "At least you know what some are!");
        setTimeout(function () {
            resetGame();
        }, 1500);
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsInPlay.push(cards[cardId].rank);
    if (cardsInPlay.length < 3) {
        this.setAttribute('src', cards[cardId].cardImage);
        if (cardsInPlay.length === 1) {
            insertMessage("response-message", "You found a " + cards[cardId].rank + "! Can you find the other one?")
        } else if (cardsInPlay.length === 2) {
            checkForMatch();
        }
    } else {
        insertMessage("response-message", "No Cheating ;)");
    }
}

function insertMessage(tagId, value) {
    document.getElementById(tagId).innerHTML = value;
}

function updateTable(match) {
    totalAttempts++;
    matchState = match;
    matchRate = (totalMatches / totalAttempts * 100).toFixed(2) + "\%";
    insertMessage("totalMatches", totalMatches);
    insertMessage("matchStreak", matchStreak);
    insertMessage("score", score);
    insertMessage("matchRate", matchRate);
}

function resetGame() {
    if (matchState === true) {
        document.getElementById('game-board').innerHTML = "";
        cardsInPlay = [];
        randomOrder = [];
        generateRandomCardOrder();
        createBoard();
    } else {
        document.getElementById('game-board').innerHTML = "";
        cardsInPlay = [];
        createBoard();
    }
}

generateRandomCardOrder();
createBoard();

let surprise = document.getElementsByClassName('surprise-container')[0];
let surpriseSound = new Audio("audio/surpriseAudio.wav");

function specialSurprise() {
    if (totalMatches === 3) {
        surpriseSound.load();
        surpriseSound.play();
        setTimeout(function () {
            surprise.style.visibility = "visible";
        }, 500);
        setTimeout(function () {
            surprise.style.visibility = "hidden";
        }, 4000);
    }
}
