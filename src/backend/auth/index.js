import { db, auth, googleProvider } from '../../config/firebase'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// Function to sign in with Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user

        // Check if the user exists in the users collection
        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) {
            // If the user doesn't exist, create a new document with their data
            await setDoc(userRef, {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            })
        }
        // else {
        //     // If the user exists, update the existing document with their data
        //     await setDoc(
        //         userRef,
        //         {
        //             displayName: user.displayName,
        //             email: user.email,
        //             photoURL: user.photoURL,
        //         },
        //         { merge: true }
        //     )
        // }

        return {
            success: true,
            message: 'Successfully signed in with Google',
            user: {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            },
            accessToken: user.accessToken,
        }
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}

// Function to sign in user anonymously
// export const signInAnonymously = async () => {
//     try {
//         const result = await anonymousUser
//         const user = result.user

//         return {
//             success: true,
//             message: 'Successfully signed in anonymously',
//             user: {
//                 uid: user.uid,
//             },
//         }
//     } catch (err) {
//         console.error(err)
//         alert(err.message)
//     }
// }
