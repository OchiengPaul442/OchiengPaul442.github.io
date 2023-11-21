import React, { useState } from 'react'
import {
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import {
    AddIcon,
    HamBurgerIcon,
    HomeIcon,
    Settings,
    Logout,
    CloseIcon,
    LoginIcon,
} from '../icons/Icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PostModal from '../posts/PostModal'
import TopNav from './TopNav'
import CommunityLogo from '../../assets/icons/logo.png'
import { signOutUser } from '../../backend/auth'
import Skeleton from '@mui/material/Skeleton'
import { auth } from '../../config/firebase'

const TopBar = ({ onClick, value }) => {
    const dispatch = useDispatch()
    const loggedIn = useSelector((state) => state.auth?.loggedIn)
    const imageURL = useSelector((state) => state.auth?.user?.photoURL)
    const categories = useSelector((state) => state?.categories?.categories)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleCategory = (category) => (event) => {
        event.preventDefault()
        dispatch({
            type: 'SET_CATEGORIES',
            payload: category,
        })
    }

    const handleLogout = async () => {
        try {
            // Sign out user
            await signOutUser()
        } catch (error) {
            console.error('Error signing out: ', error)
            return
        }

        // Dispatch logout action to clear user data
        dispatch({ type: 'CLEAR_USER' })

        // Remove token from local storage
        localStorage.removeItem('persist:root')

        // Set logged in status to false
        dispatch({
            type: 'SET_LOGGED_IN',
            payload: false,
        })

        // Redirect to home page
        window.location.href = '/'
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleCloseModal = () => setOpen(false)

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
                            {!value ? (
                                auth?.currentUser === null ? (
                                    <Skeleton
                                        width={40}
                                        height={40}
                                        variant="rectangular"
                                    />
                                ) : (
                                    <HamBurgerIcon
                                        fill="orange"
                                        width="35"
                                        height="35"
                                    />
                                )
                            ) : (
                                <CloseIcon
                                    fill="orange"
                                    width="35"
                                    height="35"
                                />
                            )}
                        </button>
                        {auth?.currentUser === null ? (
                            <Skeleton
                                width={200}
                                height={40}
                                variant="rectangular"
                            />
                        ) : (
                            <Link to="/" className="flex ml-2 md:mr-24">
                                <img
                                    src={CommunityLogo}
                                    alt="Community Box"
                                    className="w-12 h-12 mt-2"
                                />

                                <span className="hidden self-center text-xl font-semibold pl-2 sm:text-2xl whitespace-nowrap dark:text-white lg:inline-flex">
                                    Community Box
                                </span>
                            </Link>
                        )}
                    </div>

                    {window.location.pathname === '/' ? (
                        auth?.currentUser === null ? (
                            <Skeleton
                                width={200}
                                height={40}
                                variant="rectangular"
                            />
                        ) : (
                            <div className="hidden md:inline-flex lg:inline-flex">
                                <TopNav
                                    handleCategory={handleCategory}
                                    categories={categories}
                                />
                            </div>
                        )
                    ) : null}

                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            {auth?.currentUser === null ? (
                                <Skeleton
                                    width={40}
                                    height={40}
                                    variant="rectangular"
                                    style={{ borderRadius: '50%' }}
                                />
                            ) : (
                                <div className="flex items-center">
                                    {loggedIn && (
                                        <Tooltip title="Add New Post">
                                            <button
                                                type="button"
                                                ref={null}
                                                onClick={handleOpen}
                                                className="mx-3"
                                            >
                                                <AddIcon
                                                    fill="orange"
                                                    width="36"
                                                    height="36"
                                                />
                                            </button>
                                        </Tooltip>
                                    )}
                                    <Avatar
                                        onClick={handleClick}
                                        className="cursor-pointer"
                                        alt="Remy Sharp"
                                        src={imageURL}
                                    />
                                </div>
                            )}

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {[
                                    <MenuItem onClick={handleClose} key="home">
                                        <ListItemIcon>
                                            <HomeIcon
                                                fill="none"
                                                width="24"
                                                height="24"
                                            />
                                        </ListItemIcon>
                                        <Link to="/">
                                            <ListItemText
                                                primary="Home"
                                                className="text-sm"
                                            />
                                        </Link>
                                    </MenuItem>,
                                    loggedIn && (
                                        <div>
                                            <MenuItem
                                                onClick={handleClose}
                                                key="settings"
                                            >
                                                <ListItemIcon>
                                                    <Settings
                                                        fill="none"
                                                        width="24"
                                                        height="24"
                                                    />
                                                </ListItemIcon>
                                                <Link to="/settings">
                                                    <ListItemText
                                                        primary="Settings"
                                                        className="text-sm"
                                                    />
                                                </Link>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleLogout}
                                                key="logout"
                                            >
                                                <ListItemIcon>
                                                    <Logout
                                                        fill="none"
                                                        width="24"
                                                        height="24"
                                                    />
                                                </ListItemIcon>
                                                <Link>
                                                    <ListItemText
                                                        primary="Logout"
                                                        className="text-sm"
                                                    />
                                                </Link>
                                            </MenuItem>
                                        </div>
                                    ),
                                    !loggedIn && (
                                        <Link to="/auth">
                                            <MenuItem key="login">
                                                <ListItemIcon>
                                                    <LoginIcon
                                                        fill="none"
                                                        width="24"
                                                        height="24"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary="Login" />
                                            </MenuItem>
                                        </Link>
                                    ),
                                ].filter(Boolean)}
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <PostModal open={open} handleCloseModal={handleCloseModal} />
        </nav>
    )
}

export default TopBar
