import * as actionTypes from './actionTypes'

export const loadCards = () => {
    return {
        type:actionTypes.LOAD_CARDS,
        data:JSON.parse(localStorage.getItem('cards'))
    }
}

export const addCard = (card) => {
    return {
        type:actionTypes.ADD_CARD,
        data:card
    }
}