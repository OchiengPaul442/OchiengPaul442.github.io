import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Page from '../../layout/Page'
import { PostCard } from '../../components'
import { getPosts } from '../../backend/posts'
import { TopNav } from '../../components'

const Home = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categories)
    const reload = useSelector((state) => state.actionReducer.reload)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])

    const handleCategory = (category) => (event) => {
        event.preventDefault()
        dispatch({
            type: 'SET_CATEGORIES',
            payload: category,
        })
    }

    useEffect(() => {
        setIsLoading(true)

        // Define the update callback
        const updateCallback = (posts) => {
            // Convert user field in the array of posts to an object
            const resArray = posts.map((post) => {
                return {
                    ...post,
                    user: {
                        ...post.user,
                    },
                }
            })

            // Include displayName from user object in the array of posts
            resArray.forEach((post) => {
                post.displayName = post.user.displayName
                post.photoURL = post.user.photoURL
                post.phoneNumber = post.user.phoneNumber
            })

            setPosts(resArray)
            setIsLoading(false)
        }

        // Call getPosts with the update callback
        const unsubscribe = getPosts(updateCallback)

        // Return cleanup function to stop listening to updates when component unmounts
        return () => {
            unsubscribe()
        }
    }, [reload])

    const filteredPosts = posts.filter((post) => post.type === categories)

    return (
        <Page>
            <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-3xl">
                    {window.location.pathname === '/' && (
                        <div className="inline-flex md:hidden mb-4 w-full justify-center">
                            <TopNav
                                handleCategory={handleCategory}
                                categories={categories}
                            />
                        </div>
                    )}
                    <PostCard
                        post={filteredPosts}
                        comment={false}
                        loading={isLoading}
                        quantity={true}
                    />
                </div>
            </div>
        </Page>
    )
}

export default Home
