const initialState = {
    isLoading: false,
    selectedItems: [],
    selectedStage: 0,
    allProducts: [],
    searchName: "",
}

export default (state=initialState, action) => {
    switch(action.type){
        case 'SET_ALL_PRODUCTS': return{...state, allProducts: action.payload};
        case 'SET_SEARCH_NAME': return{...state, searchName: action.payload};
        case 'CLEAR_SELECTED': return {...state, selectedItems: []};
        case 'ADD_TO_SELECTED': return {...state, selectedItems: [...state.selectedItems, action.payload]};
        case 'REMOVE_FROM_SELECED': return {...state, selectedItems: state.selectedItems.filter(item => item._id!=action.payload)};
        case 'INCREMENT_SELECTED': return{...state, selectedItems: state.selectedItems.map((item => item._id == action.payload ? {...item, count: item.count+1} : item))};
        case 'DECREMENT_SELECTED': return{...state,selectedItems: state.selectedItems.map((item => item._id == action.payload ? {...item, count: item.count-1} : item)) };
        case "CHANGE_SELECTED_STAGE": return {...state, selectedStage: action.payload};
        default: return {...state};
    }
}