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
        cardElement.setAttribute('src', 'images/back.png');
        cardElement.setAttribute('data-id', randomOrder[i]);
        cardElement.addEventListener('click', flipCard);
        document.getElementById('game-board').appendChild(cardElement);
    }
}

function checkForMatch() {
    if (cardsInPlay[0] === cardsInPlay[1]) {
        totalMatches++;
        totalAttempts++;
        matchStreak++;
        score += (5 + matchStreak * 5);
        matchRate = (totalMatches / totalAttempts * 100).toFixed(2) + "\%";
        matchState = true;
        updateTable();
        specialSurprise();
        responseMessage("response-message", "You found a match! Can you find " +
            (matchStreak + 1) + " in a row? ");
        setTimeout(function () {
            resetGame();
        }, 2000);
    } else {
        totalAttempts++;
        matchStreak = 0;
        matchRate = (totalMatches / totalAttempts * 100).toFixed(2) + "\%";
        matchState = false;
        updateTable();
        responseMessage("response-message", "Shoot! You didn't find a match. " +
            "At least you know what some are!");
        setTimeout(function () {
            resetGame();
        }, 2000);
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsInPlay.push(cards[cardId].rank);
    if (cardsInPlay.length < 3) {
        this.setAttribute('src', cards[cardId].cardImage);
        if (cardsInPlay.length === 1) {
            responseMessage("response-message", "You found a " + cards[cardId].rank + "! Can you find the other one?")
        } else if (cardsInPlay.length === 2) {
            checkForMatch();
        }
    } else {
        responseMessage("response-message", "No Cheating ;)");
    }
}

function responseMessage(tagId, value) {
    document.getElementById(tagId).innerHTML = value;
}

function updateTable() {
    responseMessage("totalMatches", totalMatches);
    responseMessage("matchStreak", matchStreak);
    responseMessage("score", score);
    responseMessage("matchRate", matchRate);
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
let surpriseSound = new Audio("audio/surprise.wav");

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
