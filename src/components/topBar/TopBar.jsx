import React, { useState } from 'react'
import { CommunityIcon, MailIcon, HamBurgerIcon } from '../icons/Icons'
import { Link } from 'react-router-dom'

const TopBar = ({ onClick }) => {
    const [show, setShow] = useState(false)
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button
                            onClick={onClick}
                            type="button"
                            className="inline-flex items-center p-2 sm:hidden"
                        >
                            <HamBurgerIcon
                                fill="orange"
                                width="35"
                                height="35"
                            />
                        </button>
                        <Link to="/" className="flex ml-2 md:mr-24">
                            <CommunityIcon fill="none" width="40" height="40" />
                            {window.innerWidth > 768 && (
                                <span className="self-center text-xl font-semibold pl-2 sm:text-2xl whitespace-nowrap dark:text-white">
                                    Community Box
                                </span>
                            )}
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div className="mx-3">
                                <MailIcon fill="none" width="32" height="32" />
                            </div>
                            <div>
                                <button
                                    onClick={() => setShow(!show)}
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                        alt="user photo"
                                    />
                                </button>
                            </div>
                            <div
                                className={`z-50 ${
                                    show
                                        ? 'block absolute top-10 right-5'
                                        : 'hidden'
                                } my-4 w-44 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                                id="dropdown-user"
                            >
                                <div className="px-4 py-3" role="none">
                                    <p
                                        className="text-sm text-gray-900 dark:text-white"
                                        role="none"
                                    >
                                        Paul sims
                                    </p>
                                    <p
                                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                        role="none"
                                    >
                                        paul@gmail.com
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <Link
                                            to="/"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Home
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/logout"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopBar
