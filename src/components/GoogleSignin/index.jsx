// useGoogleSignIn.js
import { useDispatch } from 'react-redux'
import { signInWithGoogle } from '../../backend/auth'

const useGoogleSignIn = () => {
    const dispatch = useDispatch()

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

                // navigate to home page
                window.location.href = '/'
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
