import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth'
import categoriesReducer from './categories'
import postsSlice from './fetchPosts'
import actionReducer from './actions'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    categories: categoriesReducer,
    auth: authReducer,
    posts: postsSlice,
    actionReducer: actionReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)

export default store
