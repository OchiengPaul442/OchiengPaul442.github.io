import React, { useState, useEffect } from 'react'
import Page from '../layout/Page'
import { ShareIcon, LikeIcon } from '../components/icons/Icons'
import { MessagePopup, Post } from '../components'

const Home = () => {
    const [isFixed, setIsFixed] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('free')

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar')
            const navbarOffsetTop = navbar ? navbar.offsetTop : null
            if (window.scrollY >= navbarOffsetTop) {
                setIsFixed(true)
            } else {
                setIsFixed(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
            category: 'free',
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
            category: 'borrow',
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
            category: 'wanted',
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
            category: 'free',
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
            category: 'borrow',
        },
    ]

    return (
        <Page>
            <div
                className={`grid ${
                    window.innerWidth > 1450
                        ? 'sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 '
                        : 'col-span-3'
                } gap-4`}
            >
                {/* first section */}
                <div className="col-span-2 md:col-span-2 mx-auto gap-4">
                    {/* post */}
                    <Post />
                    {/* mobile view */}
                    {window.innerWidth < 868 && (
                        <>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                            >
                                Category
                                <svg
                                    className="w-2.5 h-2.5 ml-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            <div
                                className={`z-10 ${
                                    showDropdown ? 'block absolute' : 'hidden'
                                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownDelayButton"
                                >
                                    <li>
                                        <span
                                            onClick={() =>
                                                setSelectedCategory('free')
                                            }
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Free
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            onClick={() =>
                                                setSelectedCategory('borrow')
                                            }
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Borrowed
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            onClick={() =>
                                                setSelectedCategory('wanted')
                                            }
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Wanted
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                    {Posts.map(
                        (post) =>
                            post.category === selectedCategory && (
                                <div
                                    key={post.id}
                                    className="max-w-3xl mx-auto h-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
                                                            .map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="w-full h-full object-cover rounded-lg"
                                                                        src={
                                                                            image
                                                                        }
                                                                        alt=""
                                                                    />
                                                                )
                                                            )}
                                                    </div>
                                                </>
                                            ) : (
                                                post.images.map(
                                                    (image, index) => (
                                                        <img
                                                            key={index}
                                                            className="w-full h-full object-cover rounded-sm"
                                                            src={image}
                                                            alt=""
                                                        />
                                                    )
                                                )
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
                                            <ShareIcon
                                                fill="none"
                                                width="24"
                                                height="24"
                                            />
                                            <span className="ml-2">share</span>
                                        </button>
                                    </div>

                                    <div className="px-6 pt-4 pb-2 flex items-center border-t-2">
                                        Quantity available:
                                        <span className="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-700 bg-gray-200 rounded-full">
                                            2
                                        </span>
                                    </div>
                                </div>
                            )
                    )}
                </div>
                {/* second section */}
                {window.innerWidth > 1450 && (
                    <div className="relative w-96 col-span-1 md:col-span-1">
                        <div
                            id="navbar"
                            className={` ${
                                window.innerWidth < 1450 ? 'w-56' : 'w-96'
                            }
                           p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${
                               isFixed ? 'fixed' : ''
                           }`}
                        >
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    Choose a category
                                </h5>
                            </a>
                            <div className="flex flex-col justify-center">
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory('free')}
                                    className={
                                        selectedCategory === 'free'
                                            ? 'text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800'
                                            : 'text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800'
                                    }
                                >
                                    Free
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedCategory('borrow')
                                    }
                                    className={
                                        selectedCategory === 'borrow'
                                            ? 'text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800'
                                            : 'text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800'
                                    }
                                >
                                    Borrow
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedCategory('wanted')
                                    }
                                    className={
                                        selectedCategory === 'wanted'
                                            ? 'text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800'
                                            : 'text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800'
                                    }
                                >
                                    Wanted
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <MessagePopup />
        </Page>
    )
}

export default Home
