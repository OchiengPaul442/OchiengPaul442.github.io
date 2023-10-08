import React, { useState, useCallback, useEffect } from 'react'
import { Typography, Button, Modal, Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import { createPost } from '../../backend/posts'
import { Loader } from '../icons/Icons'
import { useSelector } from 'react-redux'
import ImageUploader from '../fileUpload/ImageUploader'
import { Slide, Snackbar } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

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
    const isMobileDevice = window.innerWidth < 1024
    const userId = useSelector((state) => state.auth.user.uid)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        title: '',
        description: '',
        itemType: 'free',
        quantity: 0,
    })
    const [error, setError] = useState({
        open: false,
        error: '',
        status: '',
    })

    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: 'success',
    })

    const handleClose = () => {
        setError({ open: false })
    }

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    useEffect(() => {
        if (error.open) {
            const timer = setTimeout(() => {
                setError((prevState) => ({
                    ...prevState,
                    open: false,
                }))
            }, 2500)

            return () => clearTimeout(timer)
        }
    }, [error])

    const onDrop = useCallback((files) => {
        // Append the uploaded images to the existing images
        setImages([...images, ...files])
    }, [])

    const [images, setImages] = useState([]) // Store the captured and uploaded images
    const [previewImages, setPreviewImages] = useState([]) // Store preview images

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
            images, // Include the captured and uploaded images in the post data
            quantity: state.quantity,
        }

        try {
            setLoading(true)
            await createPost(post)
            resetForm()
            handleCloseModal()
            setError({
                open: true,
                error: 'Item added successfully',
                status: 'success',
            })
        } catch (error) {
            console.log(error)
            setError({
                open: true,
                error: 'Something went wrong',
                status: 'error',
            })
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
        setPreviewImages([])
    }

    const handleCameraCapture = (event) => {
        // Open the device's camera for capturing images
        event.preventDefault()
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = 'image/*'
        fileInput.capture = 'camera' // Use the device's camera
        fileInput.onchange = (e) => {
            const selectedFile = e.target.files[0]
            if (selectedFile) {
                const reader = new FileReader()
                reader.onload = (event) => {
                    const imageSrc = event.target.result
                    const imageFile = new File(
                        [selectedFile],
                        'camera-image.png',
                        {
                            type: selectedFile.type,
                        }
                    )
                    setImages([...images, imageFile])
                    setPreviewImages([...previewImages, imageSrc])
                }
                reader.readAsDataURL(selectedFile)
            }
        }
        fileInput.click()
    }

    const removePreviewImage = (index) => {
        const updatedImages = [...images]
        updatedImages.splice(index, 1)

        const updatedPreviewImages = [...previewImages]
        updatedPreviewImages.splice(index, 1)

        setImages(updatedImages)
        setPreviewImages(updatedPreviewImages)
    }

    return (
        <>
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
                            <span className="text-blue-700 ml-2">
                                Community Box
                            </span>
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
                        {isMobileDevice && (
                            <div className="flex justify-end mt-4">
                                <IconButton
                                    aria-label="camera"
                                    sx={{ color: 'orange' }}
                                    onClick={handleCameraCapture}
                                >
                                    <CameraAltIcon sx={{ fontSize: 30 }} />
                                </IconButton>
                            </div>
                        )}

                        {previewImages.length > 0 && (
                            <div className="mb-4">
                                <Typography
                                    variant="h6"
                                    component="h3"
                                    className="text-gray-900 dark:text-white"
                                >
                                    Image Preview
                                </Typography>
                                <div className="grid gap-2 grid-cols-2 mt-2">
                                    {previewImages.map((imageSrc, index) => (
                                        <div key={index} className="relative">
                                            <IconButton
                                                aria-label="delete"
                                                className="absolute top-0 right-0"
                                                sx={{ color: 'red' }}
                                                onClick={() =>
                                                    removePreviewImage(index)
                                                }
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <img
                                                src={imageSrc}
                                                alt={`Preview ${index}`}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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
            <Snackbar
                open={error.open}
                autoHideDuration={6000}
                onClose={() => setError({ open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                TransitionComponent={Slide}
            >
                <Alert
                    onClose={handleClose}
                    severity={error.status}
                    style={{ backgroundColor: '#1c274c', color: 'white' }}
                >
                    {error.error}
                </Alert>
            </Snackbar>
        </>
    )
}

export default PostModal
