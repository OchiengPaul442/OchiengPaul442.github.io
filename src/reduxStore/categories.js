const initialCategoriesState = {
    categories: 'free',
}

const categoriesReducer = (state = initialCategoriesState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
            }
        default:
            return state
    }
}

export default categoriesReducer
