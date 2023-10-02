import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPosts } from '../backend/posts/index.js'

const initialState = {
    posts: [],
    loading: false,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const res = await getPosts()
        return res
    } catch (error) {
        return Promise.reject(error)
    }
})

const postsSlice = (state = initialState, action) => {
    switch (action.type) {
        case fetchPosts.pending:
            return {
                ...state,
                loading: true,
            }
        case fetchPosts.fulfilled:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            }
        case fetchPosts.rejected:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default postsSlice
