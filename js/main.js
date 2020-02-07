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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateRandomCardOrder() {
    while (randomOrder.length < cards.length) {
        let randomInt = getRandomInt(4);
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

/*Reset button is not currently working correctly. It works fine the first time, however it seems to get
* stuck in one configuration after it's initial use.*/

function checkForMatch() {
    if (cardsInPlay[0] === cardsInPlay[1]) {
        responseMessage("You found a match!");
        let resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', resetAfterWin);
    } else {
        responseMessage("Shoot! You did not find a match. Try again!");
        let resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', resetAfterLoss);
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsInPlay.push(cards[cardId].rank);
    if (cardsInPlay.length < 3) {
        this.setAttribute('src', cards[cardId].cardImage);
        if (cardsInPlay.length === 1) {
            responseMessage("You found a " + cards[cardId].rank + "! Can you find the other one?")
        } else if (cardsInPlay.length === 2) {
            checkForMatch();
        }
    } else {
        responseMessage("No Cheating ;)");
    }
}

function responseMessage(message) {
    document.getElementById('response-message').innerHTML = message;
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
