const initialAuthState = {
    accessToken: {
        token: null,
        anonymous: true,
    },
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
                accessToken: {
                    token: action.payload.token,
                    anonymous: action.payload.anonymous,
                },
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
                user: {
                    uid: 'N/A',
                    displayName: 'N/A',
                    email: 'N/A',
                    photoURL: 'N/A',
                },
                accessToken: 'N/A',
            }
        default:
            return state
    }
}

export default authReducer
