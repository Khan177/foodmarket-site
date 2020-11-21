export const addToSelected = (item) => {
    return {
        type: "ADD_TO_SELECTED",
        payload: item,
    }
}

export const clearSelected = () => {
    return {
        type: "CLEAR_SELECTED",
    }
}

export const changeSelectedStage = (stage) => {
    return {
        type: "CHANGE_SELECTED_STAGE",
        payload: stage,
    }
}

export const removeFromSelected = (id) => {
    return {
        type: "REMOVE_FROM_SELECED",
        payload: id,
    }
}

export const incrementSelected = (id) => {
    return {
        type: "INCREMENT_SELECTED",
        payload: id,
    }
}

export const decrementSelected = (id) => {
    return {
        type: "DECREMENT_SELECTED",
        payload: id,
    }
}