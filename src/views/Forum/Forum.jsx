import React, { useEffect, useState, useRef } from 'react'
import Page from '../../layout/Page'
import { getPosts } from '../../backend/posts'
import { PostCard } from '../../components'
import { useSelector } from 'react-redux'
import { Loader } from '../../components/icons/Icons'

const Forum = () => {
    const reload = useSelector((state) => state.actionReducer.reload)
    const [posts, setPosts] = useState([])

    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [fetchedPosts, setFetchedPosts] = useState([])
    const bottomBoundaryRef2 = useRef(null)

    useEffect(() => {
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

            setFetchedPosts((prevPosts) => [...prevPosts, ...resArray]) // corrected here

            setIsLoadingMore(false)
        }

        // Call getPosts with the update callback
        getPosts(updateCallback)

        // Intersection observer for infinite scrolling
        const scrollObserver = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting) {
                    setIsLoadingMore(true)
                    await getPosts(updateCallback)
                }
            },
            { threshold: 1 }
        )

        if (bottomBoundaryRef2.current) {
            scrollObserver.observe(bottomBoundaryRef2.current)
        }

        return () => {
            if (bottomBoundaryRef2.current) {
                scrollObserver.unobserve(bottomBoundaryRef2.current)
            }
        }
    }, [reload])

    useEffect(() => {
        const uniquePosts = Array.from(
            new Set(fetchedPosts.map((post) => post.id))
        ).map((id) => fetchedPosts.find((post) => post.id === id))
        setPosts(uniquePosts)
    }, [fetchedPosts])

    return (
        <Page>
            <div className="max-w-3xl mx-auto pb-2">
                <div className="col-span-2 md:col-span-2 gap-4">
                    <PostCard post={posts} comment={true} />
                </div>
                <div ref={bottomBoundaryRef2}></div>
                {isLoadingMore && (
                    <div className="w-full flex justify-center items-center  mb-2">
                        <Loader width={65} height={65} />
                    </div>
                )}
            </div>
        </Page>
    )
}

export default Forum
