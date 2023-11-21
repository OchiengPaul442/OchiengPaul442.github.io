const initialAuthState = {
    accessToken: {
        uid: null,
        token: null,
        anonymous: true,
    },
    user: {
        uid: null,
        displayName: null,
        email: null,
        photoURL: null,
        country: null,
        location: null,
        phoneNumber: null,
    },
    loggedIn: false,
}

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'SET_ACCESS_TOKEN':
            return {
                ...state,
                accessToken: {
                    uid: action.payload.uid,
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
                    country: action.payload.country,
                    location: action.payload.location,
                    phoneNumber: action.payload.phoneNumber,
                },
            }
        case 'SET_LOGGED_IN':
            return {
                ...state,
                loggedIn: action.payload,
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
