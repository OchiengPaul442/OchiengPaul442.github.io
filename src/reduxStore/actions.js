const initialState = {
    reload: false,
}

const actionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RELOAD':
            return {
                ...state,
                reload: action.payload,
            }
        default:
            return state
    }
}

export default actionReducer
