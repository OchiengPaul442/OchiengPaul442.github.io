import { db } from '../../config/firebase'
import {
    collection,
    getDocs,
    addDoc,
    getDoc,
    doc as firestoreDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    onSnapshot,
    Timestamp,
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
export const getPosts = (updateCallback) => {
    try {
        const unsubscribe = onSnapshot(
            collection(db, 'posts'),
            async (querySnapshot) => {
                const postsWithUserDetails = []
                for (let doc of querySnapshot.docs) {
                    const post = { ...doc.data(), id: doc.id }
                    // Fetch user details for the post
                    const userDocRef = firestoreDoc(db, 'users', post.userId)
                    const userDocSnap = await getDoc(userDocRef)
                    if (userDocSnap.exists()) {
                        const user = userDocSnap.data()
                        postsWithUserDetails.push({ ...post, user })
                    }
                }
                updateCallback(postsWithUserDetails)
            }
        )
        return unsubscribe
    } catch (error) {
        console.error('Error getting posts: ', error)
    }
}

// Function to get a single post
export const getPost = async (postId) => {
    try {
        const postRef = doc(db, 'posts', postId)
        const docSnap = await getDoc(postRef)
        if (docSnap.exists()) {
            const post = docSnap.data()
            return { ...post, id: docSnap.id }
        } else {
            console.error('No such document!')
        }
    } catch (error) {
        console.error('Error getting post: ', error)
    }
}

// Function to like and unlike a post
export const likePost = async (postId, userId) => {
    try {
        const postRef = doc(db, 'posts', postId)

        // Get the current user's likes
        const docSnap = await getDoc(postRef)
        if (!docSnap.exists()) {
            console.error('Post not found: ', postId)
            return
        }

        const post = docSnap.data()
        let likes = post.likes

        // Check if 'likes' field exists, if not create it
        if (!likes) {
            likes = []
            await updateDoc(postRef, { likes: [] })
        }

        const isLiked = likes.includes(userId)

        // Use Firestore's arrayUnion and arrayRemove to add or remove likes
        if (isLiked) {
            await updateDoc(postRef, { likes: arrayRemove(userId) })
            return {
                success: false,
                message: 'Post unliked successfully',
                likes: likes.filter((id) => id !== userId), // Return the updated likes
            }
        } else {
            await updateDoc(postRef, { likes: arrayUnion(userId) })
            return {
                success: true,
                message: 'Post liked successfully',
                likes: [...likes, userId], // Return the updated likes
            }
        }
    } catch (error) {
        console.error('Error updating likes for post: ', error)
    }
}

// Function to comment on a post
export const commentOnPost = async (
    postId,
    userId,
    displayName,
    photoURL,
    comment
) => {
    try {
        const postRef = doc(db, 'posts', postId)

        // Get the current user's comments
        const docSnap = await getDoc(postRef)
        if (!docSnap.exists()) {
            console.error('Post not found: ', postId)
            return
        }

        const post = docSnap.data()
        let comments = post.comments

        // Check if 'comments' field exists, if not create it
        if (!comments) {
            comments = []
            await updateDoc(postRef, { comments: [] })
        }

        // Add comment to the post
        const newComment = {
            userId,
            displayName,
            photoURL,
            comment,
            createdAt: Timestamp.fromDate(new Date()),
        }

        await updateDoc(postRef, { comments: arrayUnion(newComment) })
            .then(() => {
                return {
                    success: true,
                    message: 'Comment added successfully',
                }
            })
            .catch(() => {
                return {
                    success: false,
                    message: 'Error adding comment',
                }
            })
    } catch (error) {
        console.error('Error adding comment to post: ', error)
    }
}
