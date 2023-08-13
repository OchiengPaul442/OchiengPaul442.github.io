import React, { useState } from 'react'
import {
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {
    CommunityIcon,
    AddIcon,
    HamBurgerIcon,
    HomeIcon,
    Settings,
    Logout,
} from '../icons/Icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ImageUploader from 'react-images-upload'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: 'none',
    boxShadow: 24,
    p: 2,
    '@media (max-width: 768px)': {
        width: '90%',
    },
}

const TopBar = ({ onClick }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])

    const categories = useSelector((state) => state.categories)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const onDrop = (pictureFiles, pictureDataURLs) => {
        setImages(pictureFiles)
    }

    const handleCategory = (category) => (event) => {
        event.preventDefault()
        dispatch({
            type: 'SET_CATEGORIES',
            payload: category,
        })
    }

    const [open, setOpen] = React.useState(false)
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
                            <HamBurgerIcon
                                fill="orange"
                                width="35"
                                height="35"
                            />
                        </button>
                        <Link
                            to="/community_box"
                            className="flex ml-2 md:mr-24"
                        >
                            <CommunityIcon fill="none" width="40" height="40" />
                            {window.innerWidth > 768 && (
                                <span className="self-center text-xl font-semibold pl-2 sm:text-2xl whitespace-nowrap dark:text-white">
                                    Community Box
                                </span>
                            )}
                        </Link>
                    </div>
                    {window.location.pathname === '/community_box' && (
                        <div
                            className="hidden sm:inline-flex  rounded-md shadow-sm "
                            role="group"
                        >
                            <button
                                type="button"
                                onClick={handleCategory('free')}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:text-white"
                                style={{
                                    backgroundColor:
                                        categories === 'free' && '#e1effe',
                                }}
                            >
                                Free
                            </button>
                            <button
                                type="button"
                                onClick={handleCategory('borrow')}
                                className=" inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:text-white"
                                style={{
                                    backgroundColor:
                                        categories === 'borrow' && '#e1effe',
                                }}
                            >
                                Borrowed
                            </button>
                            <button
                                type="button"
                                onClick={handleCategory('wanted')}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:text-white"
                                style={{
                                    backgroundColor:
                                        categories === 'wanted' && '#e1effe',
                                }}
                            >
                                Wanted
                            </button>
                        </div>
                    )}
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <button onClick={handleOpen} className="mx-3">
                                <Tooltip title="Add Post">
                                    <AddIcon
                                        fill="#1c274c"
                                        width="36"
                                        height="36"
                                    />
                                </Tooltip>
                            </button>

                            <Avatar
                                onClick={handleClick}
                                className="cursor-pointer"
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
                                    <Link to="/community_box">
                                        <ListItemText
                                            primary="Home"
                                            className="text-sm"
                                        />
                                    </Link>
                                </MenuItem>
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
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Logout
                                            fill="none"
                                            width="24"
                                            height="24"
                                        />
                                    </ListItemIcon>
                                    <Link to="/logout">
                                        <ListItemText
                                            primary="Logout"
                                            className="text-sm"
                                        />
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                keepMounted
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Add Item to{' '}
                        <span className="text-blue-700">Community Box</span>
                    </Typography>
                    <TextField
                        fullWidth
                        label="Post Title"
                        value={title}
                        onChange={handleTitleChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleDescriptionChange}
                        variant="outlined"
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        id="Select Item Type"
                        sx={{
                            mt: 2,
                            mb: 2,
                        }}
                        variant="outlined"
                        select
                        label="Select Item Type"
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value="free">Free</option>
                        <option value="borrow">Borrow</option>
                        <option value="wanted">Wanted</option>
                    </TextField>
                    <ImageUploader
                        withIcon={true}
                        buttonText="Choose images"
                        onChange={onDrop}
                        imgExtension={[
                            '.jpg',
                            '.gif',
                            '.png',
                            '.jpeg',
                            '.webp',
                            '.jfif',
                            '.svg',
                            '.bmp',
                        ]}
                        maxFileSize={5242880}
                        withPreview={true}
                        fileSizeError="file size is too big"
                        label="Max file size: 5mb, accepted: jpg | gif | png | jpeg | webp | jfif | svg | bmp"
                    />
                </Box>
            </Modal>
        </nav>
    )
}

export default TopBar
