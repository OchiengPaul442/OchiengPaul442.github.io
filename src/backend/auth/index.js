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
} from 'firebase/firestore'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as signIn,
    sendPasswordResetEmail,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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

// Function to log out the user
export const signOutUser = async () => {
    try {
        await auth.signOut()
        return {
            success: true,
            message: 'Successfully signed out',
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
        // Convert inputs to lowercase
        let email = usernameOrEmail.toLowerCase()

        // If the input is not an email, treat it as a username and look up the corresponding email
        if (!email.includes('@')) {
            const username = email
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('displayName', '==', username))
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                return {
                    success: false,
                    message: 'User does not exist',
                }
            } else {
                email = querySnapshot.docs[0].data().email.toLowerCase()
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
        // Convert inputs to lowercase
        const lowerCaseUsername = username.toLowerCase()
        const lowerCaseEmail = email.toLowerCase()
        const lowerCasePassword = password.toLowerCase()

        const result = await createUserWithEmailAndPassword(
            auth,
            lowerCaseEmail,
            lowerCasePassword
        )
        const user = result.user

        // Prepare the user data
        const userData = {
            uid: user.uid,
            displayName: lowerCaseUsername,
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

        // Convert inputs to lowercase
        const lowerCaseDisplayName = user.displayName.toLowerCase()
        const lowerCaseEmail = user.email.toLowerCase()
        const lowerCasePhoneNumber = user.phoneNumber
            ? user.phoneNumber.toLowerCase()
            : null

        // Prepare the user data
        const userData = {
            uid: user.uid,
            displayName: lowerCaseDisplayName,
            email: lowerCaseEmail,
            photoURL: user.photoURL,
            phoneNumber: lowerCasePhoneNumber,
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

        // Check if the user document exists and has a phone number
        if (userDoc.exists()) {
            const userData = userDoc.data()
            const hasPhoneNumber = Boolean(userData.phoneNumber)
            return {
                success: true,
                hasPhoneNumber,
            }
        } else {
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

// Function to fetch the user's details
export const getUserDetails = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid)
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
            return {
                success: true,
                message: 'Successfully fetched user details',
                user: docSnap.data(),
            }
        } else {
            return {
                success: false,
                message: 'User does not exist',
            }
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: 'Error fetching user details',
        }
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

export const changePassword = async (oldPassword, newPassword) => {
    try {
        const user = auth.currentUser

        if (!user) {
            return {
                success: false,
                message: 'User is not authenticated',
            }
        }

        // Check if the old password matches the one in the database
        const credential = EmailAuthProvider.credential(user.email, oldPassword)

        try {
            await reauthenticateWithCredential(user, credential)
        } catch (reauthError) {
            // Handle reauthentication error
            console.error('Error during reauthentication:', reauthError)
            return {
                success: false,
                message: 'Old password is incorrect',
            }
        }

        // If reauthentication is successful, update the user's password
        try {
            await updatePassword(user, newPassword)
            return {
                success: true,
                message: 'Successfully changed password',
            }
        } catch (updatePasswordError) {
            // Handle password update error
            console.error('Error updating password:', updatePasswordError)
            return {
                success: false,
                message:
                    'Error changing password, please try again' +
                    updatePasswordError,
            }
        }
    } catch (error) {
        console.error('General error changing password:', error)
        return {
            success: false,
            message: 'Error changing password, please try again',
        }
    }
}

// Function to upload the user's profile picture
export const uploadProfilePicture = async (uid, file) => {
    try {
        // Check if file is not empty
        if (!file) {
            return {
                success: false,
                message: 'No file selected, please select a file',
            }
        }

        // Check if file size is acceptable (less than 4MB)
        const fileSize = file.size / 1024 / 1024 // in MB
        if (fileSize > 4) {
            return {
                success: false,
                message:
                    'File size is too large, please select a file less than 4MB',
            }
        }

        // Check if file type is acceptable (jpg, jpeg, png, gif, bmp)
        const fileType = file.type
        const acceptedFileTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
            'image/webp',
        ]
        if (!acceptedFileTypes.includes(fileType)) {
            return {
                success: false,
                message:
                    'File type is not accepted, please select a jpg, png, gif, bmp or webp file',
            }
        }

        const storage = getStorage()
        const storageRef = ref(storage, `users/${uid}/profilePicture`)
        await uploadBytes(storageRef, file)

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef)

        // Update the user's profile picture
        const userRef = doc(db, 'users', uid)
        await setDoc(userRef, { photoURL: downloadURL }, { merge: true })

        return {
            success: true,
            message: 'Successfully uploaded profile picture',
            downloadURL: downloadURL,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: 'Error uploading profile picture, please try again',
        }
    }
}
