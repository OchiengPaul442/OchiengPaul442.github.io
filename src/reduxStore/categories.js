import { configureStore } from '@reduxjs/toolkit'

const initialState = {
    categories: 'free',
}

const reducer = (state = initialState, action) => {
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

const store = configureStore({
    reducer,
})

export default store
