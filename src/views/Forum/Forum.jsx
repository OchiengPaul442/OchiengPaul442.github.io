import React, { useEffect, useState } from 'react'
import Page from '../../layout/Page'
import { getPosts } from '../../backend/posts'
import { PostCard } from '../../components'
import { useSelector } from 'react-redux'

const Forum = () => {
    const [isLoading, setIsLoading] = useState(true)
    const reload = useSelector((state) => state.actionReducer.reload)
    const [posts, setPosts] = useState([])

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

    return (
        <Page>
            <div className="max-w-3xl mx-auto">
                <div className="col-span-2 md:col-span-2 gap-4 h-screen">
                    <PostCard post={posts} comment={true} loading={isLoading} />
                </div>
            </div>
        </Page>
    )
}

export default Forum
