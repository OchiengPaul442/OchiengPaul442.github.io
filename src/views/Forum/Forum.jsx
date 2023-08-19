import React, { useEffect, useState } from 'react'
import Page from '../../layout/Page'

import { getPosts } from '../../backend/posts'
import { MessagePopup, PostCard, Loader } from '../../components'
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
                <div className="col-span-2 md:col-span-2 gap-4 h-screen">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Loader width="200" height="200" />
                        </div>
                    ) : posts !== null ? (
                        posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                comment={true}
                                loading={loading}
                            />
                        ))
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

export default Forum
