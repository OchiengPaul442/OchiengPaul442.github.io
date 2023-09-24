import React, { useState } from 'react'
import { TextField, Typography, Button, Modal, Box } from '@mui/material'
import { createPost } from '../../backend/posts'
import { Loader } from '../icons/Icons'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
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

    const onDrop = (pictureFiles) => {
        setImages((prevImages) => {
            // If both arrays are empty, return an empty array
            if (!prevImages.length && !pictureFiles.length) {
                return []
            }

            // If only one of the arrays is empty, return the other array
            if (!prevImages.length) {
                return [...pictureFiles]
            }
            if (!pictureFiles.length) {
                return [...prevImages]
            }

            // Merge both arrays and filter out duplicates
            const merged = [
                ...prevImages.filter((img) => !pictureFiles.includes(img)),
                ...pictureFiles,
            ]

            return merged
        })
    }

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

    console.log('tes', images)
    console.log('tes', itemType)
    console.log('tes', quantity)
    console.log('tes', description)
    console.log('tes', title)

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Add Item to
                    <span className="text-blue-700"> Community Box</span>
                </Typography>
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
                    <TextField
                        fullWidth
                        label="Post Title"
                        value={title}
                        onChange={handleTitleChange}
                        sx={{
                            mt: 2,
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleDescriptionChange}
                        variant="outlined"
                        sx={{
                            mt: 2,
                        }}
                    />

                    <TextField
                        fullWidth
                        id="Select Item Type"
                        sx={{
                            mt: 2,
                        }}
                        variant="outlined"
                        select
                        label="Select Item Type"
                        SelectProps={{
                            native: true,
                        }}
                        value={itemType}
                        onChange={handleOptionChange}
                    >
                        <option value="free">Free</option>
                        <option value="borrow">Borrow</option>
                        <option value="wanted">Wanted</option>
                    </TextField>
                    <TextField
                        fullWidth
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        sx={{ mt: 2, mb: 2 }}
                    />

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
