import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Page from '../../layout/Page'
import { MessagePopup, PostCard, Loader } from '../../components'
import { getPosts } from '../../backend/posts'
import { TopNav } from '../../components'

const Home = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.auth.accessToken)
    const categories = useSelector((state) => state.categories.categories)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true)
            try {
                const res = await getPosts()
                setPosts(res)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPosts()
    }, [])

    const handleCategory = (category) => (event) => {
        event.preventDefault()
        dispatch({
            type: 'SET_CATEGORIES',
            payload: category,
        })
    }

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
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <Loader width="200" height="200" />
                        </div>
                    ) : posts.length > 0 ? (
                        posts.map((post) =>
                            post.type === categories ? (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    comment={false}
                                    loading={isLoading}
                                />
                            ) : null
                        )
                    ) : (
                        <div className="w-full flex justify-center top-32 text-2xl font-bold text-gray-500">
                            No Posts Available
                        </div>
                    )}
                </div>
            </div>
            {accessToken && <MessagePopup />}
        </Page>
    )
}

export default Home
