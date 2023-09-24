import React, { useState, useCallback } from 'react'
import { Typography, Button, Modal, Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import { createPost } from '../../backend/posts'
import { Loader } from '../icons/Icons'
import { useDispatch, useSelector } from 'react-redux'
import ImageUploader from '../fileUpload/ImageUploader'

const style = {
    width: '800px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: 24,
    p: 4,
    '@media (max-width: 768px)': {
        width: '90%',
    },
}

const PostModal = ({ open, handleCloseModal }) => {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.auth.user.uid)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [itemType, setItemType] = useState('free')
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success',
    })

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const onDrop = useCallback((files) => {
        setImages(files)
    }, [])

    const handleOptionChange = (event) => {
        setItemType(event.target.value)
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
    }

    const handleSubmit = async () => {
        if (!title || !description || !itemType || !images.length) {
            setAlert({
                show: true,
                message: 'Please fill all the fields',
                type: 'error',
            })
            return
        }

        const post = {
            userId,
            title,
            description,
            itemType,
            images,
            quantity,
        }

        try {
            setLoading(true)
            await createPost(post)
            resetForm()
            handleCloseModal()
            showAlert('Post created successfully', 'success')
        } catch (error) {
            console.log(error)
            showAlert(error.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setTitle('')
        setDescription('')
        setItemType('free')
        setImages([])
    }

    const showAlert = (message, type) => {
        dispatch({
            type: 'SET_ALERT',
            payload: {
                show: true,
                message,
                type,
            },
        })
    }

    return (
        <Modal
            keepMounted
            open={open}
            onClose={() => {
                handleCloseModal()
                resetForm()
            }}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <div className="flex justify-between py-4">
                    <Typography variant="h6" component="h2">
                        Add Item to
                        <span className="text-blue-700"> Community Box</span>
                    </Typography>
                    <IconButton
                        aria-label="delete"
                        sx={{ color: 'red' }}
                        onClick={() => {
                            handleCloseModal()
                            resetForm()
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                {alert.show && (
                    <Alert
                        severity={alert.type}
                        onClose={() => setAlert({ ...alert, show: false })}
                        sx={{ mt: 2 }}
                    >
                        {alert.message}
                    </Alert>
                )}
                <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <div className="mb-4">
                        <label
                            htmlFor="Post Title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="Post Title"
                            value={title}
                            onChange={handleTitleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="Description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <textarea
                            id="Description"
                            rows="4"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="Item Type"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select Item Type
                        </label>
                        <select
                            id="Item Type"
                            value={itemType}
                            onChange={handleOptionChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="free">Free</option>
                            <option value="borrow">Borrow</option>
                            <option value="wanted">Wanted</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="Quantity"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="Quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        />
                    </div>

                    <ImageUploader
                        onUpload={onDrop}
                        maxFileSize={5242880}
                        acceptedFileTypes={[
                            'image/jpeg',
                            'image/png',
                            'image/jpg',
                        ]}
                        style={{ width: '500px', height: '500px' }}
                    />
                </Box>
                {loading ? (
                    <div className="mt-2 mx-2">
                        <Loader />
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Add Item
                    </Button>
                )}
            </Box>
        </Modal>
    )
}

export default PostModal
