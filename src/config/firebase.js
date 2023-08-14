import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBmr-namJy3yCsT0fRniwrHS_xEL-2OIcs',
    authDomain: 'com-box.firebaseapp.com',
    projectId: 'com-box',
    storageBucket: 'com-box.appspot.com',
    messagingSenderId: '518164386194',
    appId: '1:518164386194:web:7534bd04e0feb271ae714b',
    measurementId: 'G-28G5G59DZY',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { db, auth, googleProvider }
