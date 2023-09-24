import React, { useEffect, useState } from 'react'
import Page from '../../layout/Page'

import { getPosts } from '../../backend/posts'
import { PostCard, Loader } from '../../components'

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
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <Loader width="200" height="200" />
                        </div>
                    ) : posts !== null ? (
                        posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                comment={true}
                                loading={isLoading}
                            />
                        ))
                    ) : (
                        <div className="w-full flex justify-center top-32 text-2xl font-bold text-gray-500">
                            No Posts Available
                        </div>
                    )}
                </div>
            </div>
        </Page>
    )
}

export default Forum
