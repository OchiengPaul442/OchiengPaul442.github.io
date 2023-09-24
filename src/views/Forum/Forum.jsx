import React, { useEffect, useState } from 'react'
import Page from '../../layout/Page'

import { getPosts } from '../../backend/posts'
import { PostCard } from '../../components'

const Forum = () => {
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
