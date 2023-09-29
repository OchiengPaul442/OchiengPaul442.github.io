import React, { useState, useEffect, useRef } from 'react'
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import Box from '@mui/material/Box'
import { useMediaQuery } from 'react-responsive'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    HomeIcon,
    ForumIcon,
    SignInIcon,
    LoginIcon,
    Settings,
    CloseIcon,
} from '../icons/Icons'

const SideBar = ({ show, setShowSideBar }) => {
    const accessToken = useSelector((state) => state.auth.accessToken.token)
    const anonymous = useSelector((state) => state.auth.accessToken.anonymous)
    const [showRegister, setShowRegister] = useState(false)
    const isMobileView = useMediaQuery({ maxWidth: 640 })
    const sidebarRef = useRef(null)

    const showRegisterBox = () => {
        setShowRegister(true)
    }

    const handleCloseSidebar = () => {
        setShowSideBar(false)
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                isMobileView &&
                show &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target)
            ) {
                handleCloseSidebar()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [isMobileView, show])

    useEffect(() => {
        if (isMobileView && show) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileView, show])

    return (
        <Drawer
            anchor="left"
            open={isMobileView ? show : true}
            variant="persistent"
            onClose={() => setShowSideBar(false)}
            className="fixed top-0 z-40 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    top: '0',
                    left: '0',
                    width: isMobileView ? '240px' : '260px',
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
            <Box
                ref={sidebarRef}
                sx={{
                    width: 'auto',
                    height: '100%',
                }}
            >
                <div className="h-full px-3 py-4 overflow-y-auto justify-between flex flex-col">
                    <div className="px-3 pb-4 mt-14 overflow-y-auto bg-white dark:bg-gray-800">
                        <List component="nav" className="space-y-2 font-medium">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-blue-100 dark:bg-blue-900'
                                        : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                }
                            >
                                <ListItemIcon>
                                    <HomeIcon
                                        fill="none"
                                        width="24"
                                        height="24"
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </NavLink>

                            <NavLink
                                to="/forum"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-blue-100 dark:bg-blue-900'
                                        : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                }
                            >
                                <ListItemIcon>
                                    <ForumIcon
                                        fill="none"
                                        width="24"
                                        height="24"
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Forum" />
                            </NavLink>
                            {!anonymous && accessToken && (
                                <NavLink
                                    to="/settings"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-blue-100 dark:bg-blue-900'
                                            : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                    }
                                >
                                    <ListItemIcon>
                                        <Settings
                                            fill="none"
                                            width="24"
                                            height="24"
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </NavLink>
                            )}
                            {anonymous && accessToken && (
                                <Link
                                    to="/auth"
                                    className="flex items-center p-2 rounded-lg group hover:bg-blue-100"
                                >
                                    <ListItemIcon>
                                        <LoginIcon
                                            fill="none"
                                            width="24"
                                            height="24"
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </Link>
                            )}
                        </List>
                    </div>

                    {anonymous && !showRegister && (
                        <div className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900">
                            <div className="flex items-center mb-3">
                                <ListItemIcon>
                                    <SignInIcon
                                        fill="none"
                                        width="24"
                                        height="24"
                                    />
                                </ListItemIcon>
                                <button
                                    onClick={showRegisterBox}
                                    type="button"
                                    className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                                >
                                    <span className="sr-only">Close</span>
                                    <CloseIcon />
                                </button>
                            </div>
                            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                                In case you are not yet registered for the
                                community box, you can do so by clicking the
                                button below.
                            </p>
                            <Link
                                to="/auth"
                                className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Register Me
                            </Link>
                        </div>
                    )}
                </div>
            </Box>
        </Drawer>
    )
}

export default SideBar
