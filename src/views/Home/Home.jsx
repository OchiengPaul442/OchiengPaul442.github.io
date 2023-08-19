import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Page from '../../layout/Page'
import { MessagePopup, PostCard } from '../../components'
import { getPosts } from '../../backend/posts'
import { TopNav } from '../../components'

const Home = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.auth.accessToken)
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
                        <div className="inline-flex md:hidden mb-4 w-full justify-center">
                            <TopNav
                                handleCategory={handleCategory}
                                categories={categories}
                            />
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
            {accessToken && <MessagePopup />}
        </Page>
    )
}

export default Home
