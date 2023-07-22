import React from 'react'
import { Link } from 'react-router-dom'
import {
    HomeIcon,
    ForumIcon,
    MailBoxIcon,
    SignInIcon,
    LoginIcon,
} from '../icons/Icons'

const SideBar = ({ show }) => {
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
                            <Link
                                to="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <HomeIcon fill="none" width="24" height="24" />
                                <span className="ml-3">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/forum"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <ForumIcon fill="none" width="24" height="24" />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Forum
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/mailBox"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <MailBoxIcon
                                    fill="none"
                                    width="24"
                                    height="24"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    MailBox
                                </span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-orange-800 bg-orange-100 rounded-full dark:bg-orange-900 dark:text-orange-300">
                                    3
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/login"
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
                    id="dropdown-cta"
                    className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
                    role="alert"
                >
                    <div className="flex items-center mb-3">
                        <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-1 rounded dark:bg-orange-200 dark:text-orange-900">
                            <SignInIcon fill="none" width="24" height="24" />
                        </span>
                        <button
                            type="button"
                            className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                            data-dismiss-target="#dropdown-cta"
                            aria-label="Close"
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
                    <a
                        className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        href="#"
                    >
                        Register Me
                    </a>
                </div>
            </div>
        </aside>
    )
}

export default SideBar
