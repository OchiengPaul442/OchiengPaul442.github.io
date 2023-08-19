import { db } from '../../config/firebase'
import {
    collection,
    getDocs,
    addDoc,
    getDoc,
    doc as firestoreDoc,
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const storage = getStorage()

// Function to create a new post
export const createPost = async (data) => {
    try {
        // Upload images to Firebase Storage
        const imageUrls = []
        for (const image of data.images) {
            const storageRef = ref(storage, `images/${image.name}`)
            await uploadBytes(storageRef, image)
            const imageUrl = await getDownloadURL(storageRef)
            imageUrls.push(imageUrl)
        }

        // Create post object
        const newPost = {
            userId: data.userId,
            title: data.title,
            description: data.description,
            type: data.itemType,
            images: imageUrls,
            quantity: data.quantity,
            createdAt: new Date(),
        }

        // Add post to Firestore with auto-generated ID
        await addDoc(collection(db, 'posts'), newPost).then(() => {
            return {
                success: true,
                message: 'Post created successfully',
            }
        })
    } catch (error) {
        console.error('Error creating post: ', error)
    }
}

// Function to get all posts
export const getPosts = async () => {
    const posts = []
    const querySnapshot = await getDocs(collection(db, 'posts'))
    for (const doc of querySnapshot.docs) {
        const postData = doc.data()
        const userDoc = await getDoc(firestoreDoc(db, 'users', postData.userId))
        const userData = userDoc.data()
        posts.push({
            id: doc.id,
            ...postData,
            displayName: userData.displayName,
            photoURL: userData.photoURL,
        })
    }
    return posts
}
