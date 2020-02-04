let cards = ["queen", "queen", "king", "king"];
let cardsInPlay = [];

let cardOne = cards[0];
cardsInPlay.push(cardOne);
let cardTwo = cards[2];
cardsInPlay.push(cardTwo);

if (cardsInPlay.length === 2) {
    if (cardsInPlay[0] === cardsInPlay[1]) {
        alert("You found a match!");
    } else {
        alert("Your cards did not match. Try again.");
    }
}