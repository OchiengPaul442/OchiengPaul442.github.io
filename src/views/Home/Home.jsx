import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Page from '../../layout/Page'
import { PostCard } from '../../components'
import { getPosts } from '../../backend/posts'
import { TopNav } from '../../components'

const Home = () => {
    const dispatch = useDispatch()
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
                    />
                </div>
            </div>
        </Page>
    )
}

export default Home
