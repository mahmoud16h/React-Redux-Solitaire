export const incrementCardIndex = () => {
    return {
        type: 'INCREMENT-CARD-INDEX',
    }
}

export const shuffleDeck = () => {
    return {
        type: 'SHUFFLE-DECK',
    }
}

export const dealDeck = () => {
    return {
        type: 'DEAL-DECK',
    }
}

export const moveDeckCard = (toMove, index) => {
    return{
        type: 'MOVE-DECK-CARD',
        toMove,
        index,

    }
}

export const moveStack = (array, card, arrayIndex) => {
    return{
        type: 'MOVE-STACK',
        array,
        card,
        arrayIndex

    }
}

export const moveStackTo = (array, card, arrayIndex) => {
    return{
        type: 'MOVE-STACK-TO',
        array,
        card,
        arrayIndex
    }
}

export const moveCardToAce = (arrayIndex) => {
    return{
        type: 'MOVE-CARD-TO-ACE',
        arrayIndex
    }
}

export const moveThirteen = (arrayIndex) => {
    return{
        type: 'MOVE-THIRTEEN',
        arrayIndex
    }
}
