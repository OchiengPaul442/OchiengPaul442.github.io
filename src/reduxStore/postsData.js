import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPosts } from '../backend/posts'

const initialState = {
    posts: [],
    loading: false,
    error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const posts = await getPosts()
        // Ensure all values are serializable
        return posts.map((post) => ({
            ...post,
            createdAt: post.createdAt.toString(), // Convert Date object to string
        }))
    } catch (err) {
        throw new Error(err.toString())
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
                state.error = null // Reset the error state when starting the request
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action?.payload
                state.loading = false
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action?.error?.message
            })
    },
})

export default postsSlice.reducer
