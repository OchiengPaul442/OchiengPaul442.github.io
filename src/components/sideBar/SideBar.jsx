import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    HomeIcon,
    ForumIcon,
    MailBoxIcon,
    SignInIcon,
    LoginIcon,
} from '../icons/Icons'

const SideBar = ({ show }) => {
    const [showRegister, setShowRegister] = useState(false)

    const showRegisterBox = () => {
        setShowRegister(true)
    }

    return (
        <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
                !show ? '-translate-x-full' : 'sm:translate-x-0'
            } bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto justify-between flex flex-col">
                <div className=" px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <NavLink
                                to="/community_box"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-blue-100 dark:bg-blue-900'
                                        : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                }
                            >
                                <HomeIcon fill="none" width="24" height="24" />
                                <span className="ml-3">Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/forum"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-blue-100 dark:bg-blue-900'
                                        : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                }
                            >
                                <ForumIcon fill="none" width="24" height="24" />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Forum
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/mailBox"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-blue-100 dark:bg-blue-900'
                                        : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                }
                            >
                                <MailBoxIcon
                                    fill="none"
                                    width="24"
                                    height="24"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    MailBox
                                </span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    3
                                </span>
                            </NavLink>
                        </li>

                        <li>
                            <Link
                                to="/auth"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <LoginIcon fill="none" width="24" height="24" />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Login
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div
                    className={`p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900 ${
                        !showRegister ? 'block' : 'hidden'
                    }`}
                    role="alert"
                >
                    <div className="flex items-center mb-3">
                        <span className="bg-orange-100  text-sm font-semibold mr-2 px-2.5 py-1 rounded dark:bg-orange-200">
                            <SignInIcon fill="none" width="24" height="24" />
                        </span>
                        <button
                            onClick={showRegisterBox}
                            type="button"
                            className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="w-2.5 h-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>
                    <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                        In case you are not yet registered for the community
                        box, you can do so by clicking the button below.
                    </p>
                    <Link
                        to="/auth"
                        className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        href="#"
                    >
                        Register Me
                    </Link>
                </div>
            </div>
        </aside>
    )
}

export default SideBar