// useGoogleSignIn.js
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../../backend/auth'

const useGoogleSignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignWithGoogle = async () => {
        try {
            const res = await signInWithGoogle()
            if (res.success === true) {
                dispatch({
                    type: 'SET_ACCESS_TOKEN',
                    payload: {
                        uid: res.user.uid,
                        token: res.accessToken,
                        anonymous: res.anonymous,
                    },
                })

                dispatch({
                    type: 'SET_LOGGED_IN',
                    payload: {
                        loggedIn: true,
                    },
                })

                // navigate to home page
                navigate('/')
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { handleSignWithGoogle }
}

export default useGoogleSignIn
