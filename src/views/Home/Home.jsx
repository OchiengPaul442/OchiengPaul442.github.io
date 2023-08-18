import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Page from '../../layout/Page'
import { MessagePopup, PostCard } from '../../components'
import { getPosts } from '../../backend/posts'

const Home = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const category = useSelector((state) => state.categories.categories)

    const handleCategory = (category) => (event) => {
        event.preventDefault()
        dispatch({
            type: 'SET_CATEGORIES',
            payload: category,
        })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const res = await getPosts()
                setPosts(res)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <Page>
            <div className="flex flex-col items-center gap-4">
                {/* first section */}
                <div className="w-full max-w-3xl">
                    {window.location.pathname === '/community_box' ||
                    window.location.pathname === '/community_box/' ? (
                        <div
                            className="inline-flex md:hidden mb-4 w-full justify-center rounded-md"
                            role="group"
                        >
                            <button
                                type="button"
                                onClick={handleCategory('free')}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:text-white"
                                style={{
                                    backgroundColor:
                                        categories === 'free' && '#e1effe',
                                }}
                            >
                                Free
                            </button>
                            <button
                                type="button"
                                onClick={handleCategory('borrow')}
                                className=" inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:text-white"
                                style={{
                                    backgroundColor:
                                        categories === 'borrow' && '#e1effe',
                                }}
                            >
                                Borrowed
                            </button>
                            <button
                                type="button"
                                onClick={handleCategory('wanted')}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:text-white"
                                style={{
                                    backgroundColor:
                                        categories === 'wanted' && '#e1effe',
                                }}
                            >
                                Wanted
                            </button>
                        </div>
                    ) : null}
                    {/* posts */}
                    {posts.map(
                        (post) =>
                            post.type === category && (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    quantity={true}
                                    loading={loading}
                                />
                            )
                    )}
                </div>
            </div>
            <MessagePopup />
        </Page>
    )
}

export default Home
