import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import ImageUploader from 'react-images-upload'
import { createPost } from '../../backend/posts'
import { Loader } from '../icons/Icons'
import { useDispatch, useSelector } from 'react-redux'

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

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const onDrop = (pictureFiles) => {
        setImages(pictureFiles)
    }

    const handleOptionChange = (event) => {
        setItemType(event.target.value)
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
    }

    const handleSubmit = async () => {
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
            setTitle('')
            setDescription('')
            setItemType('free')
            setImages([])
            setLoading(false)
            handleCloseModal()
            dispatch({
                type: 'SET_ALERT',
                payload: {
                    show: true,
                    message: 'Post created successfully',
                    type: 'success',
                },
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            dispatch({
                type: 'SET_ALERT',
                payload: {
                    show: true,
                    message: error.message,
                    type: 'error',
                },
            })
        }
    }

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
                <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
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
                        fileContainerStyle={{
                            backgroundColor: '#f5f5f5',
                            boxShadow: 'none',
                            borderRadius: '5px',
                        }}
                        maxFileSize={5242880}
                        withPreview={true}
                        defaultImage={images}
                        fileSizeError="file size is too big"
                        label="Max file size: 5mb, accepted: jpg | gif | png | jpeg | webp | jfif | svg | bmp"
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
