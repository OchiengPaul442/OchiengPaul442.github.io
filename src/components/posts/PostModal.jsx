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
    p: 2,
    '@media (max-width: 768px)': {
        width: '90%',
    },
}

const PostModal = ({ open, handleCloseModal }) => {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.auth.user.uid)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [state, setState] = useState({
        title: '',
        description: '',
        itemType: 'free',
        quantity: 0,
    })

    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success',
    })

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const onDrop = useCallback((files) => {
        setImages(files)
    }, [])

    const handleSubmit = async () => {
        if (
            !state.title ||
            !state.description ||
            !state.itemType ||
            !state.quantity ||
            images.length === 0
        ) {
            setAlert({
                show: true,
                message: 'Please fill all the fields',
                type: 'error',
            })
            return
        }

        const post = {
            ...state,
            userId,
            title: state.title,
            description: state.description,
            itemType: state.itemType,
            images,
            quantity: state.quantity,
        }

        try {
            setLoading(true)
            await createPost(post)

            resetForm()
            setImages([])
            handleCloseModal()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setState({
            title: '',
            description: '',
            itemType: 'free',
            quantity: 0,
        })
        setImages([])
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
                            name="title"
                            value={state.title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5"
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
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 "
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
                            name="itemType"
                            value={state.itemType}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 "
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
                            name="quantity"
                            value={state.quantity}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2.5 "
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
