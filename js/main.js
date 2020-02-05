let cards = ["queen", "queen", "king", "king"];
let cardsInPlay = [];

function checkForMatch() {
    if (cardsInPlay[0] === cardsInPlay[1]) {
        alert("You found a match!");
    } else {
        alert("Your cards did not match. Try again.");
    }
}

function flipCard(cardId) {
    console.log("User flipped " + cards[cardId]);
    cardsInPlay.push(cards[cardId]);
    if (cardsInPlay.length === 2) {
        checkForMatch();
    } else {
        alert("Flip another card.")
    }
}

flipCard(0);
flipCard(1);
