import { db, auth, googleProvider } from '../../config/firebase'
import { signInWithPopup, signInAnonymously } from 'firebase/auth'
import {
    doc,
    getDocs,
    getDoc,
    collection,
    query,
    where,
    setDoc,
    onSnapshot,
} from 'firebase/firestore'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as signIn,
    sendPasswordResetEmail,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from 'firebase/auth'

export const signInUserAnonymously = async () => {
    try {
        const result = await signInAnonymously(auth)
        const user = result.user

        return {
            success: true,
            message: 'Successfully signed in anonymously',
            user: {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            },
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
            phoneNumber: user.phoneNumber,
        }

        if (!userDoc.exists()) {
            // If the user doesn't exist, create a new document with their data
            await setDoc(userRef, userData)
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

// Function to check if the signedin user has a phone number set in the database
export const checkIfUserHasPhoneNumber = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid)
        const userDoc = await getDoc(userRef)

        // Check if the user document exists
        if (!userDoc.exists()) {
            return {
                success: false,
                message: 'User does not exist',
            }
        }

        // Check if the user has a phone number
        const userData = userDoc.data()
        // and check if phone number is snot null
        if (userData.phoneNumber && userData.phoneNumber !== '') {
            return {
                success: true,
                hasPhoneNumber: true,
            }
        } else {
            return {
                success: true,
                hasPhoneNumber: false,
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

// Function to fetch the user's details
export const getUserDetails = (uid, callback) => {
    try {
        const userRef = doc(db, 'users', uid)

        // Listen for real-time updates
        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                // Return the user data
                callback({
                    success: true,
                    message: 'Successfully fetched user details',
                    user: doc.data(),
                })
            } else {
                callback({
                    success: false,
                    message: 'User does not exist',
                })
            }
        })

        // Return the unsubscribe function to stop listening for updates
        return unsubscribe
    } catch (err) {
        console.error(err)
        return () => {}
    }
}

// Function to update the user's details
export const updateUserDetails = async (uid, details) => {
    try {
        const userRef = doc(db, 'users', uid)
        await setDoc(userRef, details, { merge: true })

        return {
            success: true,
            message: 'Successfully updated user details',
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: err.message,
        }
    }
}

// Function to reset the user's password
export const resetPassword = async (email) => {
    try {
        // check if the user exists
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('email', '==', email))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.empty) {
            return {
                success: false,
                message: 'User Email does not exist',
            }
        }

        return sendPasswordResetEmail(auth, email)
            .then(() => {
                return {
                    success: true,
                    message: 'Password reset email sent successfully',
                }
            })
            .catch((error) => {
                console.error('Error sending password reset email:', error)
                return {
                    success: false,
                    message: 'Error sending password reset email',
                }
            })
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: 'Error sending password reset email',
        }
    }
}

// Function to help user change password (takes in current oldpassword for confirmation, password and new password)
export const changePassword = async (oldPassword, newPassword) => {
    try {
        const user = auth.currentUser
        const credential = EmailAuthProvider.credential(user.email, oldPassword)

        // Reauthenticate the user with their current password
        await reauthenticateWithCredential(user, credential)
            .then(() => {
                return {
                    success: true,
                    message: 'Successfully reauthenticated user',
                }
            })
            .catch((error) => {
                console.error('Error reauthenticating user:', error)
                return {
                    success: false,
                    message: 'Error reauthenticating user',
                }
            })

        // Update the user's password
        await updatePassword(user, newPassword)
            .then(() => {
                return {
                    success: true,
                    message: 'Successfully changed password',
                }
            })
            .catch((error) => {
                console.error('Error changing password:', error)
                return {
                    success: false,
                    message: 'Error changing password',
                }
            })
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: 'Error changing password, please try again',
        }
    }
}
