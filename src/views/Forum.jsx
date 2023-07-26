import React from 'react'
import Page from '../layout/Page'
import {
    ShareIcon,
    LikeIcon,
    CommentIcon,
    AddIcon,
} from '../components/icons/Icons'

const Forum = () => {
    const Posts = [
        {
            id: 1,
            Name: 'Kakuyo Philip Oding',
            Date: 'December 20, 2023',
            photo: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
            images: [
                'https://images.unsplash.com/photo-1640126288964-60593b8563e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlZCUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1569424746512-4f98ac866469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1504105547124-fc1aee34470d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            ],
            itemType: 'free',
        },
        {
            id: 2,
            Name: 'Ojok Oding',
            Date: 'December 20, 2023',
            photo: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
            images: [
                'https://images.unsplash.com/photo-1640126288964-60593b8563e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlZCUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1569424746512-4f98ac866469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            ],
        },
        {
            id: 3,
            Name: 'Peter Jojo Oding',
            Date: 'December 20, 2023',
            photo: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
            images: [
                'https://images.unsplash.com/photo-1640126288964-60593b8563e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlZCUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1569424746512-4f98ac866469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1504105547124-fc1aee34470d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            ],
        },
        {
            id: 4,
            Name: 'Kakuyo Philip Oding',
            Date: 'December 20, 2023',
            photo: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
            images: [
                'https://images.unsplash.com/photo-1640126288964-60593b8563e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlZCUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            ],
        },
        {
            id: 5,
            Name: 'Kakuyo Philip Oding',
            Date: 'December 20, 2023',
            photo: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
            images: [
                'https://images.unsplash.com/photo-1640126288964-60593b8563e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlZCUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1569424746512-4f98ac866469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1504105547124-fc1aee34470d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            ],
        },
    ]
    return (
        <Page>
            <div className="max-w-3xl mx-auto">
                {/* post */}
                <div className="flex flex-col mb-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="items-center flex">
                        <img
                            className="w-12 h-12 rounded-full mr-4"
                            src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt=""
                        />
                        <input
                            type="text"
                            placeholder="Start a post"
                            className="w-full rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex flex-row justify-end items-center mt-2 ml-4">
                        <button className="flex items-center mr-2">
                            <AddIcon fill="blue" width="24" height="24" />
                            <span className="ml-1 text-gray-600">Photo</span>
                        </button>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-2 gap-4">
                    {Posts.map((post) => (
                        <div
                            key={post.id}
                            className="w-full h-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 flex items-center">
                                    <img
                                        className="w-10 h-10 rounded-full mr-4"
                                        src={post.photo}
                                        alt=""
                                    />
                                    <div>
                                        <h3>{post.Name}</h3>
                                        <p className="text-gray-400 text-base">
                                            {post.Date}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-base">
                                    {post.content}
                                </p>
                                <div
                                    className={`w-full h-auto rounded-lg mt-4 mb-2 ${
                                        post.images.length > 1
                                            ? 'grid grid-cols-3 gap-4'
                                            : ''
                                    }`}
                                >
                                    {post.images.length > 1 ? (
                                        <>
                                            <img
                                                className="w-full h-full object-cover rounded-lg col-span-2"
                                                src={post.images[0]}
                                                alt=""
                                            />
                                            <div className="flex flex-col col-span-1 gap-4">
                                                {post.images
                                                    .slice(1)
                                                    .map((image, index) => (
                                                        <img
                                                            key={index}
                                                            className="w-full h-full object-cover rounded-lg"
                                                            src={image}
                                                            alt=""
                                                        />
                                                    ))}
                                            </div>
                                        </>
                                    ) : (
                                        post.images.map((image, index) => (
                                            <img
                                                key={index}
                                                className="w-full h-full object-cover rounded-sm"
                                                src={image}
                                                alt=""
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="px-6 pt-4 pb-2 flex space-x-2">
                                <button className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    <LikeIcon
                                        fill="none"
                                        width="24"
                                        height="24"
                                    />
                                    <span className="ml-2">like</span>
                                </button>
                                <button className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    <CommentIcon
                                        fill="none"
                                        width="24"
                                        height="24"
                                        className="mr-1"
                                    />
                                    <span className="ml-2">comment</span>
                                </button>
                                <button className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    <ShareIcon
                                        fill="none"
                                        width="24"
                                        height="24"
                                    />
                                    <span className="ml-2">share</span>
                                </button>
                            </div>

                            <div className="px-6 pt-4 pb-2 flex items-center border-t-2">
                                <img
                                    className="w-10 h-10 rounded-full mr-4"
                                    src={post.photo}
                                    alt=""
                                />
                                <input
                                    type="comment"
                                    placeholder="write a comment"
                                    className="appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Page>
    )
}

export default Forum
