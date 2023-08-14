import { Category } from '@mui/icons-material'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
    //...
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Function to create new user
export const createUser = async (username, email, password) => {}

// Function to login user
export const loginUser = async (email, password) => {}

// Function to logout user
export const logoutUser = async () => {}

// Get Array of posts function
export const getPosts = async () => {}

// Create  a new post function
export const createPost = async (title, description, type, images) => {}

// Function to update user profile
export const updateUserProfile = async (username, email, password) => {}
