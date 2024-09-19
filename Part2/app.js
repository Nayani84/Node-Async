const baseURL = "https://deckofcardsapi.com/api/deck";

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.

async function singleCard() {
    let data = await $.getJSON(`${baseURL}/new/draw`);
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
}
singleCard();



// 2.Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

async function someCards() {
    let firstCard = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = firstCard.deck_id;
    let secondCard = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    [firstCard, secondCard].forEach((card) => {
        console.log(`${card.cards[0].value} of ${card.cards[0].suit}`);
    });
}
someCards();



// 3.Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

async function drawCard() {
    let $btn = $('#button');
    let $cardArea = $('#card-area');

    let newDeck = await $.getJSON(`${baseURL}/new/shuffle/`);

    $btn.show().on('click', async function () {
        deckId = newDeck.deck_id;
        let card = await $.getJSON(`${baseURL}/${deckId}/draw/`);
        let cardImg = card.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let newX = Math.random() * 40 - 20;
        let newY = Math.random() * 40 - 20;

        let newImg = document.createElement('img');
        newImg.setAttribute('src', cardImg);
        newImg.setAttribute('style', `transform: translate(${newX}px, ${newY}px) rotate(${angle}deg)`);
        $cardArea.append(newImg);

        if (card.remaining === 0) {
            $btn.remove();
        }
    });
}
drawCard();