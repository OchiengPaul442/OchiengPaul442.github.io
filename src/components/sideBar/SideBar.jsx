import React, { useState, useEffect } from 'react'
import { Drawer, List } from '@mui/material'
import Box from '@mui/material/Box'
import { Link, NavLink } from 'react-router-dom'
import {
    HomeIcon,
    ForumIcon,
    MailBoxIcon,
    SignInIcon,
    LoginIcon,
    Settings,
    CloseIcon,
} from '../icons/Icons'

const SideBar = ({ show }) => {
    const [showRegister, setShowRegister] = useState(false)
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 960)

    const showRegisterBox = () => {
        setShowRegister(true)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 960)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <Box>
            <Drawer
                anchor="left"
                open={isMobileView ? show : true}
                variant="persistent"
                className="fixed top-0 z-40 h-screen pt-20 transition-transform  bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700"
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        top: '0',
                        left: '0',
                        width: '280px',
                        maxWidth: '100%',
                        height: '100%',
                        maxHeight: '100%',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        transition: 'all 0.25s ease-in-out',
                        '&.MuiDrawer-paperAnchorLeft': {
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        },
                    },
                }}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto justify-between flex flex-col">
                    <div className=" px-3 pb-4 mt-14 overflow-y-auto bg-white dark:bg-gray-800">
                        <List component="nav" className="space-y-2 font-medium">
                            <li>
                                <NavLink
                                    to="/community_box"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-blue-100 dark:bg-blue-900'
                                            : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                    }
                                >
                                    <HomeIcon
                                        fill="none"
                                        width="24"
                                        height="24"
                                    />
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
                                    <ForumIcon
                                        fill="none"
                                        width="24"
                                        height="24"
                                    />
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
                                <NavLink
                                    to="/settings"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-blue-100 dark:bg-blue-900'
                                            : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                    }
                                >
                                    <Settings
                                        fill="none"
                                        width="24"
                                        height="24"
                                    />
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Settings
                                    </span>
                                </NavLink>
                            </li>

                            <li>
                                <Link
                                    to="/auth"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <LoginIcon
                                        fill="none"
                                        width="24"
                                        height="24"
                                    />
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Login
                                    </span>
                                </Link>
                            </li>
                        </List>
                    </div>
                    <div
                        className={`p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900 ${
                            !showRegister ? 'block' : 'hidden'
                        }`}
                        role="alert"
                    >
                        <div className="flex items-center mb-3">
                            <span className="bg-orange-100  text-sm font-semibold mr-2 px-2.5 py-1 rounded dark:bg-orange-200">
                                <SignInIcon
                                    fill="none"
                                    width="24"
                                    height="24"
                                />
                            </span>
                            <button
                                onClick={showRegisterBox}
                                type="button"
                                className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                            >
                                <span className="sr-only">Close</span>
                                <CloseIcon
                                    fill="#1c274c"
                                    width="40"
                                    height="40"
                                />
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
            </Drawer>
        </Box>
    )
}

export default SideBar
