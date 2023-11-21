import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Page from '../../layout/Page'
import { PostCard } from '../../components'
import { getPosts } from '../../backend/posts'
import { TopNav } from '../../components'
import { Loader } from '../../components/icons/Icons'
import Skeleton from '@mui/material/Skeleton'
import { auth } from '../../config/firebase'

const Home = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categories)
    const reload = useSelector((state) => state.actionReducer.reload)
    const [posts, setPosts] = useState([])

    const handleCategory = (category) => (event) => {
        event.preventDefault()
        dispatch({
            type: 'SET_CATEGORIES',
            payload: category,
        })
    }

    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [fetchedPosts, setFetchedPosts] = useState([])
    const bottomBoundaryRef = useRef(null)

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

        if (bottomBoundaryRef.current) {
            scrollObserver.observe(bottomBoundaryRef.current)
        }

        return () => {
            if (bottomBoundaryRef.current) {
                scrollObserver.unobserve(bottomBoundaryRef.current)
            }
        }
    }, [reload])

    useEffect(() => {
        const uniquePosts = Array.from(
            new Set(fetchedPosts.map((post) => post.id))
        ).map((id) => fetchedPosts.find((post) => post.id === id))
        setPosts(uniquePosts)
    }, [fetchedPosts])

    const filteredPosts = posts.filter((post) => post.type === categories)

    return (
        <Page>
            <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-3xl">
                    {window.location.pathname === '/' &&
                        (auth?.currentUser === null ? (
                            <div className="inline-flex md:hidden mb-4 w-full justify-center">
                                <Skeleton
                                    width={200}
                                    height={40}
                                    variant="rectangular"
                                />
                            </div>
                        ) : (
                            <div className="inline-flex md:hidden mb-4 w-full justify-center">
                                <TopNav
                                    handleCategory={handleCategory}
                                    categories={categories}
                                />
                            </div>
                        ))}
                    <PostCard
                        post={filteredPosts}
                        comment={false}
                        quantity={true}
                    />
                </div>
                <div ref={bottomBoundaryRef}></div>
                {isLoadingMore && (
                    <div className="w-full flex justify-center items-center  mb-2">
                        <Loader width={65} height={65} />
                    </div>
                )}
            </div>
        </Page>
    )
}

export default Home
