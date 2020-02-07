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
        updateTable();
        responseMessage("response-message", "You found a match! Can you find " + (matchStreak + 1) + " in a row? " +
            "Click the Reset Game button to try!");
        createResetButton(resetAfterWin);
    } else {
        totalAttempts++;
        matchStreak = 0;
        matchRate = (totalMatches / totalAttempts * 100).toFixed(2) + "\%";
        updateTable();
        responseMessage("response-message", "Shoot! You did not find a match. " +
            "Click the Reset Game button to try again!");
        createResetButton(resetAfterLoss);
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsInPlay.push(cards[cardId].rank);
    if (cardsInPlay.length < 3) {
        this.setAttribute('src', cards[cardId].cardImage);
        if (cardsInPlay.length === 1) {
            responseMessage("response-message", "You found a " + cards[cardId].rank + "! Can you find the other one?")
            document.getElementById('reset-button').removeEventListener('click', resetAfterWin);
            document.getElementById('reset-button').removeEventListener('click', resetAfterLoss);
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

function createResetButton(theFunction) {
    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', theFunction);
}

function resetAfterWin() {
    document.getElementById('game-board').innerHTML = "";
    cardsInPlay = [];
    randomOrder = [];
    generateRandomCardOrder();
    createBoard();
}

function resetAfterLoss() {
    document.getElementById('game-board').innerHTML = "";
    cardsInPlay = [];
    createBoard();
}

generateRandomCardOrder();
createBoard();
