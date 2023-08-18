const initialAuthState = {
    accessToken: null,
    user: {
        uid: null,
        displayName: null,
        email: null,
        photoURL: null,
    },
}

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'SET_ACCESS_TOKEN':
            return {
                ...state,
                accessToken: action.payload,
            }
        case 'SET_USER':
            return {
                ...state,
                user: {
                    uid: action.payload.uid,
                    displayName: action.payload.displayName,
                    email: action.payload.email,
                    photoURL: action.payload.photoURL,
                },
            }
        case 'CLEAR_USER':
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}

export default authReducer
