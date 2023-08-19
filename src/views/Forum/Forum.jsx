import React, { useEffect, useState } from 'react'
import Page from '../../layout/Page'

import { getPosts } from '../../backend/posts'
import { MessagePopup, PostCard } from '../../components'
import { useSelector } from 'react-redux'

const Forum = () => {
    const accessToken = useSelector((state) => state.auth.accessToken)
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])

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
            <div className="max-w-3xl mx-auto">
                <div className="col-span-2 md:col-span-2 gap-4">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            comment={true}
                            loading={loading}
                        />
                    ))}
                </div>
            </div>
            {accessToken && <MessagePopup />}
        </Page>
    )
}

export default Forum
