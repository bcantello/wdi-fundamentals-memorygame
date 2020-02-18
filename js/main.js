let cards = [
    {
        rank: 'queen',
        suit: 'hearts',
        cardImage: 'images/queen-of-hearts.png',
        uniqueIdentifier: 1
    },
    {
        rank: 'queen',
        suit: 'diamonds',
        cardImage: 'images/queen-of-diamonds.png',
        uniqueIdentifier: 2
    },
    {
        rank: 'king',
        suit: 'hearts',
        cardImage: 'images/king-of-hearts.png',
        uniqueIdentifier: 3
    },
    {
        rank: 'king',
        suit: 'diamonds',
        cardImage: 'images/king-of-diamonds.png',
        uniqueIdentifier: 4
    },
    {
        rank: 'queen',
        suit: 'hearts',
        cardImage: 'images/queen-of-hearts.png',
        uniqueIdentifier: 5
    },
    {
        rank: 'queen',
        suit: 'diamonds',
        cardImage: 'images/queen-of-diamonds.png',
        uniqueIdentifier: 6
    },
    {
        rank: 'king',
        suit: 'hearts',
        cardImage: 'images/king-of-hearts.png',
        uniqueIdentifier: 7
    },
    {
        rank: 'king',
        suit: 'diamonds',
        cardImage: 'images/king-of-diamonds.png',
        uniqueIdentifier: 8
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
    if (cardsInPlay[0].rank + cardsInPlay[0].suit === cardsInPlay[1].rank + cardsInPlay[1].suit) {
        totalMatches++;
        matchStreak++;
        score += (5 + matchStreak * 5);
        updateTable(true);
        specialSurprise();
        insertMessage("response-message", "You found a match! Can you find " +
            (matchStreak + 1) + " in a row? ");
        setCardElementClass('matched');
        cardsInPlay = [];
        displayBoardClearMessage();
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
    if (this.getAttribute('class') !== 'matched') {
        this.setAttribute('class', 'flipped');
        if (cardsInPlay.includes(cards[cardId]) === false) {
            cardsInPlay.push(cards[cardId]);
        }
        if (cardsInPlay.length < 3) {
            this.setAttribute('src', cards[cardId].cardImage);
            if (cardsInPlay.length === 1) {
                insertMessage("response-message", "You found a " + cards[cardId].rank + " of " +
                    cards[cardId].suit + "! Can you find the other one?");
            } else if (cardsInPlay.length === 2) {
                checkForMatch();
            }
        } else {
            insertMessage("response-message", "No Cheating ;)");
        }
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
    let flippedCards = document.getElementsByClassName('flipped');
    for (let i = 1; i >= 0; i--) {
        flippedCards[i].setAttribute('src', 'images/cardBack.png')
        flippedCards[i].removeAttribute('class');
    }
    cardsInPlay = [];
}

function setCardElementClass(className) {
    let flippedCards = document.getElementsByClassName('flipped');
    for (let i = 1; i >= 0; i--) {
        flippedCards[i].setAttribute('class', className);
    }
}

function displayBoardClearMessage() {
    let matchedCards = document.getElementsByClassName('matched');
    if (matchedCards[7]) {
        insertMessage('response-message', "Congratulations! You have found all the matches!");
    }
}

function resetBoard() {
    document.getElementById('game-board').innerHTML = "";
    cardsInPlay = [];
    randomOrder = [];
    generateRandomCardOrder();
    createBoard();
}

function defineResetButton() {
    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetBoard);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

generateRandomCardOrder();
createBoard();
defineResetButton();

let surprise = document.getElementsByClassName('surprise-container')[0];
let surpriseSound = new Audio("audio/surpriseAudio.wav");

function specialSurprise() {
    if (totalMatches === 2) {
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
