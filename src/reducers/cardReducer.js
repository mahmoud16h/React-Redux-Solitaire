/*Deck is being made in the below function*/
function makeDeck () {
    let createDeck = () => {
        let cardArr = [];
        const redSuits = ['hearts', 'diamonds'];
        const blackSuits = ['clubs', 'spades'];
        const values = [1, 2, 3, 4, 5, 6, 7,
            8, 9, 10, 11, 12, 13];

        redSuits.forEach((suit) => {
            values.forEach((rank) => {
                cardArr.push({name: rank, rank: rank,color: 'red', suit: suit, flipped: false , selected: false});
            });
        });

        blackSuits.forEach((suit) => {
            values.forEach((rank) => {
                cardArr.push({name: rank, rank: rank,color: 'black', suit: suit, flipped: false , selected: false});
            });
        });
        for (let i = 0 ; i < cardArr.length ; i++) {
            switch (cardArr[i].rank) {
                case 1:
                    cardArr[i].name = 'A';
                    break;
                case 11:
                    cardArr[i].name = 'J';
                    break;
                case 12:
                    cardArr[i].name = 'Q';
                    break;
                case 13:
                    cardArr[i].name = 'K';
            }
        }
        return cardArr;
    };
    let deck = createDeck();
    console.log(deck);
    return deck;
}

function aceDeck() {
    let createAceDeck = () => {
        let arr = [];
        const suits = ['hearts', 'spades', 'diamonds','clubs'];
        suits.forEach((suit)=>{
            arr.push([{rank: 0, name: suit, suit: suit}])
        });
        return arr
    };
    return createAceDeck()
}

const cardReducer = (state =  { index: 0 ,myCards : makeDeck(), containerDeck: null, dealtCards: [' '], aceArea: aceDeck()}, action) => {
    switch (action.type) {
        case 'SHUFFLE-DECK':
            let newDeck =  makeDeck();
            shuffle(newDeck);
            let zeroIncrement = 0;
            return {...state, myCards: newDeck, index: zeroIncrement};
        case 'MOVE-STACK':
            let cardsChange = state.dealtCards.slice(0, state.dealtCards.length);
            let moveArray = [];
            let moveStore  = {
                card: moveArray,
                arrayIndex: action.arrayIndex,
                cardIndex: action.card
            };
            for (let i = action.card ; i < action.array.length ; i++){
                if(action.array[i].flipped){
                    moveArray.push(action.array[i]);
                    cardsChange[action.arrayIndex][i].selected = true;
                }
            }
            return {...state, containerDeck: moveStore, dealtCards: cardsChange};
        case 'MOVE-DECK-CARD':
            // add styling so that the one card that's going to be moved is now a different color to the others
            let cards = [action.toMove];
            let moveDeckStore  = {
                card: cards,
                arrayIndex: action.index,
                fromDeck: true
            };
            let changedDeck = state.myCards.slice(0, state.myCards.length);
            selectCard(changedDeck[action.index]);
            return {...state, myCards: changedDeck,containerDeck: moveDeckStore};
        case 'MOVE-STACK-TO':
            deselect(state.containerDeck.card);
            let newStack = state.dealtCards.slice(0, state.dealtCards.length);
            let storeDeck = state.myCards.slice(0, state.myCards.length);
            let stateIndex = state.index;
            if(newStack[action.arrayIndex].length !== 0){
                let numbersDifference = state.containerDeck.card[0].rank - newStack[action.arrayIndex][newStack[action.arrayIndex].length - 1].rank;
                let movingColor = state.containerDeck.card[0].color;
                let landingColor = newStack[action.arrayIndex][newStack[action.arrayIndex].length - 1].color;

                if (numbersDifference !== -1 || movingColor == landingColor) {
                    storeDeck[state.containerDeck.arrayIndex].selected = false;
                    return {...state, myCards: storeDeck, containerDeck: null}
                }
            }
            for(let i=0 ; i < state.containerDeck.card.length; i++){
                newStack[action.arrayIndex].push(state.containerDeck.card[i])}
            if(state.containerDeck.fromDeck){
                storeDeck[state.containerDeck.arrayIndex].flipped = true;
                storeDeck.splice(state.containerDeck.arrayIndex,1);
                if(stateIndex !==0){stateIndex = stateIndex -1}}
            else {
                let NumberOfcardsToRemove = newStack[state.containerDeck.arrayIndex].length - state.containerDeck.cardIndex +1;
                newStack[state.containerDeck.arrayIndex].splice(state.containerDeck.cardIndex, NumberOfcardsToRemove);
            }
            flipCards(newStack);
            return {...state, index: stateIndex, myCards: storeDeck, dealtCards: newStack, containerDeck: null};
        case 'MOVE-CARD-TO-ACE':
            state.containerDeck.card[0].selected = false;
            let newAceArea = state.aceArea.slice(0,state.aceArea.length);
            let newLowerCards = state.dealtCards.slice(0, state.dealtCards.length);
            let newUpperDeck = state.myCards.slice(0, state.myCards.length);
            let movingSuit = state.containerDeck.card[0].suit;
            let landingSuit = newAceArea[action.arrayIndex][newAceArea[action.arrayIndex].length-1].suit;
            let movingDifference = state.containerDeck.card[0].rank - newAceArea[action.arrayIndex][newAceArea[action.arrayIndex].length-1].rank;
            if(movingSuit !== landingSuit || movingDifference!== 1 )
            {return {...state, containerDeck: null}}else{
                newAceArea[action.arrayIndex].push(state.containerDeck.card[0]);
                if(state.containerDeck.fromDeck){newUpperDeck.splice(state.containerDeck.arrayIndex,1)}
                else{newLowerCards[state.containerDeck.arrayIndex].pop();
                    flipCards(newLowerCards)}
                return {...state, myCards: newUpperDeck, dealtCards: newLowerCards, aceArea: newAceArea, containerDeck: null}}
        case 'DEAL-DECK':
            console.log('deal deck');
            let dealingCards = makeDeck();
            shuffle(dealingCards);
            let cardsData = [];
            for (let i = 1 ; i < 8 ; i++){
                cardsData.push(dealingCards.splice(0, i))
            }
            console.log(cardsData);
            flipCards(cardsData);
            return {...state, index: 0, myCards: dealingCards, dealtCards: cardsData, containerCard: null, aceArea: aceDeck()};
        case 'INCREMENT-CARD-INDEX':
            let newIncrement = state.index + 1;
            if(newIncrement > state.myCards.length-1){newIncrement = 0}
            return {...state, index : newIncrement};
        default:
            return state;
    }
}


export default cardReducer;

/*Function which is used above to shuffle the deck of cards. Shuffles the items in the original array deck*/
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function selectCard(prop){
    prop.selected = true
}

function deselect (prop){
    for (let i = 0 ; i < prop.length ; i++){
        prop[i].selected = false
    }


// turn test into function
// function cardTests(actionCard, containerCard, store){
//     if(actionCard.length !== 0){
//         let numbersDifference = containerCard.card[0].rank - actionCard[actionCard.length - 1].rank;
//         let movingColor = containerCard.card[0].color;
//         let landingColor = actionCard[actionCard.length - 1].color;
//
//         if (numbersDifference !== -1 || movingColor == landingColor) {
//             deselect(store)
//             return {...state, myCards: store, containerDeck: null}
//         }
//     }
}

function flipCards(array){
    for (let i = 0 ; i < array.length ; i++){
        if(array[i][array[i].length-1]){
            array[i][array[i].length-1].flipped = true
        }}
    return array
}
