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
    CommunityIcon,
    AddIcon,
    HamBurgerIcon,
    HomeIcon,
    Settings,
    Logout,
    CloseIcon,
} from '../icons/Icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PostModal from '../posts/PostModal'
import TopNav from './TopNav'

const TopBar = ({ onClick, value }) => {
    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.auth.accessToken)
    const imageURL = useSelector((state) => state.auth.user.photoURL)
    const categories = useSelector((state) => state.categories.categories)
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

    const handleLogout = () => {
        const logout = dispatch({
            type: 'LOGOUT',
        })
        if (logout) {
            window.location.href = '/auth'
            localStorage.removeItem('persist:root')
        }
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
                                <HamBurgerIcon
                                    fill="orange"
                                    width="35"
                                    height="35"
                                />
                            ) : (
                                <CloseIcon
                                    fill="orange"
                                    width="35"
                                    height="35"
                                />
                            )}
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
                    {window.location.pathname === '/' ? (
                        <div className="hidden sm:inline-flex">
                            <TopNav
                                handleCategory={handleCategory}
                                categories={categories}
                            />
                        </div>
                    ) : null}
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            {accessToken && (
                                <button onClick={handleOpen} className="mx-3">
                                    <Tooltip title="Add Post">
                                        <AddIcon
                                            fill="orange"
                                            width="36"
                                            height="36"
                                        />
                                    </Tooltip>
                                </button>
                            )}

                            <Avatar
                                onClick={handleClick}
                                className="cursor-pointer"
                                alt="Remy Sharp"
                                src={imageURL}
                            />

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>
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
                                </MenuItem>
                                {accessToken && (
                                    <>
                                        <MenuItem onClick={handleClose}>
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
                                        <MenuItem onClick={handleLogout}>
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
                                    </>
                                )}
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
