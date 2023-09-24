import { db, auth, googleProvider, getAuth } from '../../config/firebase'
import { signInWithPopup, signInAnonymously } from 'firebase/auth'
import {
    doc,
    getDocs,
    getDoc,
    collection,
    query,
    where,
    setDoc,
    getFirestore,
} from 'firebase/firestore'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as signIn,
} from 'firebase/auth'

// Function to Sign In Anonymously
export const signInUserAnonymously = async () => {
    try {
        const result = await signInAnonymously(auth)
        const user = result.user

        // Prepare the user data
        const userData = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        }

        // Create or update the document with the user data
        const userRef = doc(db, 'users', user.uid)
        await setDoc(userRef, userData, { merge: true })

        return {
            success: true,
            message: 'Successfully signed in anonymously',
            user: userData,
            accessToken: user.accessToken,
            anonymous: true,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: err.message,
        }
    }
}

// Function to Sign In with Email/Username and Password
export const signInWithEmailAndPassword = async (usernameOrEmail, password) => {
    try {
        let email = usernameOrEmail

        // If the input is not an email, treat it as a username and look up the corresponding email
        if (!usernameOrEmail.includes('@')) {
            const username = usernameOrEmail
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('displayName', '==', username))
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                return {
                    success: false,
                    message: 'User does not exist',
                }
            } else {
                email = querySnapshot.docs[0].data().email
            }
        }

        const result = await signIn(auth, email, password)
        const user = result.user

        // Get the user data from the users collection
        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
            // If the user exists, return the user data and access token
            return {
                success: true,
                message: 'Successfully signed in with email and password',
                user: userDoc.data(),
                accessToken: user.accessToken,
                anonymous: false,
            }
        } else {
            // If the user doesn't exist, return an error
            return {
                success: false,
                message: 'User does not exist',
            }
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: err.message,
        }
    }
}

// Function to Register with Username, Email and Password
export const registerWithEmailAndPassword = async (
    username,
    email,
    password
) => {
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        const user = result.user

        // Prepare the user data
        const userData = {
            uid: user.uid,
            displayName: username,
            email: user.email,
            photoURL: user.photoURL,
        }

        // Create a new document with the user data
        const userRef = doc(db, 'users', user.uid)
        await setDoc(userRef, userData)

        return {
            success: true,
            message: 'Successfully registered with email and password',
            user: userData,
            accessToken: user.accessToken,
            anonymous: false,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: err.message,
        }
    }
}

// Function to sign in with Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user

        // Check if the user exists in the users collection
        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)

        // Prepare the user data
        const userData = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        }

        if (!userDoc.exists()) {
            // If the user doesn't exist, create a new document with their data
            await setDoc(userRef, userData)
        } else {
            // If the user exists, update the existing document with their data
            await setDoc(userRef, userData, { merge: true })
        }

        return {
            success: true,
            message: 'Successfully signed in with Google',
            user: userData,
            accessToken: user.accessToken,
            anonymous: false,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: err.message,
        }
    }
}
