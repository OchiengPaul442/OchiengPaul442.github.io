import React, { useState, useEffect, useCallback } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { ShareIcon, CommentIcon, LikeIcon } from '../icons/Icons'
import Skeleton from '@mui/material/Skeleton'
import FacebookIcon from '@mui/icons-material/Facebook'
import Xlogo from '../../assets/images/XNewLogo.png'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { GoogleIcon, Carousel } from '../../components'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import useGoogleSignIn from '../GoogleSignin/index'
import CallIcon from '@mui/icons-material/Call'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { likePost, commentOnPost, getPosts } from '../../backend/posts'
import { Slide, Snackbar, Alert } from '@mui/material'
import { Timestamp } from 'firebase/firestore'
import CommunityLogo from '../../assets/icons/logo.png'

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

const styleLogin = {
    width: '420px',
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

const socialMedia = [
    {
        name: 'Facebook',
        icon: <FacebookIcon />,
        url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
        name: 'X',
        icon: (
            <img
                src={Xlogo}
                alt="X"
                style={{ width: '24px', height: '24px' }}
            />
        ),
        url: 'https://twitter.com/intent/tweet?url=',
    },
    {
        name: 'Instagram',
        icon: <InstagramIcon />,
        url: 'https://www.instagram.com/share?url=',
    },
    {
        name: 'LinkedIn',
        icon: <LinkedInIcon />,
        url: 'https://www.linkedin.com/shareArticle?url=',
    },
]

const Card = ({ post, comment = false, quantity = false, loading = false }) => {
    const userId = useSelector((state) => state.auth?.accessToken?.uid)
    const accessToken = useSelector((state) => state.auth?.accessToken?.token)
    const anonymous = useSelector((state) => state.auth?.accessToken?.anonymous)
    const displayName = useSelector((state) => state.auth?.user?.displayName)
    const photoURL = useSelector((state) => state.auth?.user?.photoURL)
    const [open, setOpen] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const { handleSignWithGoogle } = useGoogleSignIn()

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const [likeCount, setLikeCount] = useState({})
    const [likeStatus, setLikeStatus] = useState({})
    const [error, setError] = useState({
        status: null,
        error: null,
        open: false,
    })

    const [posts, setPosts] = useState([])
    useEffect(() => {
        setPosts(post)
    }, [post])

    useEffect(() => {
        const updateCallback = (posts) => {
            const newLikeCount = {}
            const newLikeStatus = {}
            posts.forEach((post) => {
                newLikeCount[post.id] = post.likes ? post.likes.length : 0
                newLikeStatus[post.id] = post.likes
                    ? post.likes.includes(userId)
                    : false
            })

            setLikeCount(newLikeCount)
            setLikeStatus(newLikeStatus)
        }

        try {
            getPosts(updateCallback)
        } catch (err) {
            setError({
                status: 'error',
                error: err.message,
                open: true,
            })
        }
    }, [])

    const handleLike = useCallback(
        async (postId, userId) => {
            if (!accessToken || anonymous) {
                setOpenLogin(true)
                return
            }

            const currentLikeStatus = likeStatus[postId]
            const currentLikeCount = likeCount[postId] || 0

            setLikeStatus((prevLikeStatus) => ({
                ...prevLikeStatus,
                [postId]: !currentLikeStatus,
            }))

            setLikeCount((prevLikeCount) => ({
                ...prevLikeCount,
                [postId]: currentLikeStatus
                    ? currentLikeCount - 1
                    : currentLikeCount + 1,
            }))

            try {
                await likePost(postId, userId)

                if (!currentLikeStatus) {
                    setError({
                        status: 'success',
                        error: 'Post liked successfully',
                        open: true,
                    })
                }
            } catch (error) {
                console.error('Error while liking/unliking post:', error)
                setError({
                    status: 'error',
                    error: error.message,
                    open: true,
                })
            }
        },
        [likeStatus, likeCount, accessToken, anonymous]
    )

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

    // Helper function to format number of likes
    const formatLikes = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M'
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K'
        } else {
            return num
        }
    }

    const renderImage = (image, index) => {
        const imgSrc = image ? image : CommunityLogo
        return (
            <div
                key={index}
                style={{
                    height: '500px',
                    maxHeight: '520px',
                    backgroundImage: `url(${CommunityLogo})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                }}
                className="w-full h-full relative"
            >
                <img
                    className="w-full h-full object-cover  absolute inset-0"
                    src={imgSrc}
                    alt=""
                />
            </div>
        )
    }

    const [commentSec, setCommentSec] = useState(null)
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])

    const handleComment = useCallback(
        (postId) => {
            setCommentSec(commentSec === postId ? null : postId)
        },
        [commentSec]
    )

    const handleCommentOnPost = useCallback(
        async (postId, userId, comment) => {
            if (comment.trim().length === 0) {
                return
            }

            const newComment = {
                id: comments.length + 1,
                displayName,
                photoURL,
                comment,
                createdAt: Timestamp.now(),
            }

            setComments((currentComments) => [...currentComments, newComment])
            setCommentText('')

            setPosts((currentPosts) =>
                currentPosts.map((post) =>
                    post.id === postId
                        ? {
                              ...post,
                              comments: [...(post.comments || []), newComment],
                          }
                        : post
                )
            )

            try {
                await commentOnPost(
                    postId,
                    userId,
                    displayName,
                    photoURL,
                    comment
                )
                setError({
                    status: 'success',
                    error: 'Comment added successfully',
                    open: true,
                })
            } catch (error) {
                console.error('Error while commenting on post:', error)
                setError({
                    status: 'error',
                    error: error.message,
                    open: true,
                })
            }
        },
        [comments, displayName, photoURL]
    )

    const parseAndFormatDate = useCallback((dateInput) => {
        let date

        if (dateInput && typeof dateInput?.toDate === 'function') {
            date = dateInput.toDate()
        } else if (typeof dateInput === 'string') {
            date = new Date(dateInput)
        } else {
            return 'Invalid Date'
        }

        if (isNaN(date?.getTime())) {
            return dateInput
        }

        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }, [])

    return (
        <>
            {post.length > 0 ? (
                posts.map((post) => (
                    <div
                        key={post.id}
                        className="max-w-2xl mx-auto h-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                        <div className="pt-4">
                            <div className="px-2 md:px-4 font-bold text-xl mb-2 flex items-center">
                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        width={150}
                                        height={24}
                                    />
                                ) : (
                                    <h1>{post.title}</h1>
                                )}
                            </div>
                            <p className="px-2 md:px-4 text-gray-700 lg:text-base text-sm">
                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        width="100%"
                                        height={80}
                                    />
                                ) : (
                                    post.description
                                )}
                            </p>
                            <div
                                className={`w-full h-auto md:px-4 md:rounded-lg mt-4 mb-2 `}
                            >
                                {loading ? (
                                    <Skeleton
                                        variant="rectangular"
                                        width="100%"
                                        height={300}
                                    />
                                ) : (
                                    <Carousel>
                                        {post.images.length > 0
                                            ? post.images.map(renderImage)
                                            : renderImage(CommunityLogo)}
                                    </Carousel>
                                )}
                            </div>
                            <div className="flex justify-between items-center w-full px-4">
                                <div className="flex items-center">
                                    {loading ? (
                                        <Skeleton
                                            variant="circle"
                                            width={40}
                                            height={40}
                                        />
                                    ) : (
                                        <Avatar
                                            className="mr-4"
                                            sx={{ width: 40, height: 40 }}
                                            alt="Avatar"
                                            src={post.photoURL}
                                        />
                                    )}
                                    <div>
                                        {loading ? (
                                            <Skeleton
                                                variant="text"
                                                width={100}
                                                height={20}
                                            />
                                        ) : (
                                            <>
                                                <h4>{post.displayName}</h4>
                                                <p className="text-gray-400 text-sm">
                                                    {post.createdAt
                                                        .toDate()
                                                        .toDateString()}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-2 rounded-full">
                                    <IconButton
                                        aria-label="whatsapp"
                                        rel="noreferrer"
                                        target="_blank"
                                        href={
                                            isMobile
                                                ? `whatsapp://send?phone=${post.phoneNumber}`
                                                : `https://wa.me/${post.phoneNumber}`
                                        }
                                    >
                                        <WhatsAppIcon
                                            sx={{ color: '#25D366' }}
                                        />
                                    </IconButton>
                                    <IconButton
                                        aria-label="call"
                                        href={`tel:${post.phoneNumber}`}
                                    >
                                        <CallIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>

                        <div className="px-2 md:px-6 pt-2 lg:flex lg:flex-row-reverse justify-between flex flex-col-reverse pb-2 w-full">
                            <div className="overflow-x-auto">
                                <div className="space-x-2 flex justify-end mt-2">
                                    {loading ? (
                                        <Skeleton
                                            variant="circle"
                                            width={24}
                                            height={24}
                                        />
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleLike(post.id, userId)
                                            }
                                            className="text-gray-700 bg-gray-200 hover:bg-gray-400 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
                                        >
                                            <LikeIcon
                                                fill2={
                                                    likeStatus[post.id]
                                                        ? '#F87171'
                                                        : ''
                                                }
                                                width="24"
                                                height="24"
                                            />
                                            <span className="ml-2 ">
                                                {likeCount[post.id] > 0 && (
                                                    <span className="text-green-700 mr-1">
                                                        {formatLikes(
                                                            likeCount[post.id]
                                                        )}
                                                    </span>
                                                )}
                                                {likeCount[post.id] > 1
                                                    ? 'likes'
                                                    : 'like'}
                                            </span>
                                        </button>
                                    )}
                                    {comment && (
                                        <button
                                            onClick={() => {
                                                if (accessToken && !anonymous) {
                                                    handleComment(post.id)
                                                } else {
                                                    setOpenLogin(true)
                                                }
                                            }}
                                            className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                                        >
                                            <CommentIcon
                                                fill="none"
                                                width="24"
                                                height="24"
                                                className="mr-1"
                                            />

                                            <span className="ml-2">
                                                {post?.comments?.length > 0 && (
                                                    <span className="mr-2">
                                                        {formatLikes(
                                                            post?.comments
                                                                ?.length
                                                        )}
                                                    </span>
                                                )}

                                                {post?.comments?.length > 1
                                                    ? 'comments'
                                                    : 'comment'}
                                            </span>
                                        </button>
                                    )}
                                    <button
                                        onClick={handleOpen}
                                        className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                                    >
                                        {loading ? (
                                            <Skeleton
                                                variant="circle"
                                                width={24}
                                                height={24}
                                            />
                                        ) : (
                                            <ShareIcon
                                                fill="none"
                                                width="24"
                                                height="24"
                                            />
                                        )}
                                        <span className="ml-2">share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {quantity && (
                            <div
                                className="px-6 pt-4 pb-2 flex items-center border-t-2"
                                style={{
                                    borderTopColor: '#1c274c',
                                }}
                            >
                                Quantity available:
                                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-700 bg-gray-200 rounded-full">
                                    {loading ? (
                                        <Skeleton
                                            variant="text"
                                            width={20}
                                            height={16}
                                        />
                                    ) : (
                                        post.quantity
                                    )}
                                </span>
                            </div>
                        )}
                        {/* comment input field */}
                        {commentSec === post.id && (
                            <div className="bg-blue-100 rounded-lg mx-2 p-2 mb-2">
                                {/* Display comments */}
                                {commentSec === post.id && (
                                    <div>
                                        {post?.comments?.length > 0 ? (
                                            post?.comments?.map((comment) => (
                                                <div
                                                    key={comment.id}
                                                    className="flex items-start space-x-3 mt-3"
                                                >
                                                    <>
                                                        <Avatar
                                                            className="w-10 h-10 rounded-full"
                                                            alt="Avatar"
                                                            src={
                                                                comment.photoURL
                                                            }
                                                        />
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center space-x-2">
                                                                <h4 className="font-bold text-sm">
                                                                    {
                                                                        comment.displayName
                                                                    }
                                                                </h4>
                                                                <p className="text-gray-500 text-xs">
                                                                    {parseAndFormatDate(
                                                                        comment.createdAt
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <p className="text-gray-700 text-sm">
                                                                {
                                                                    comment.comment
                                                                }
                                                            </p>
                                                        </div>
                                                    </>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="w-full flex justify-center text-xl font-bold text-gray-500">
                                                No Comments Available
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Comment input field */}
                                <div className="px-2 md:px-6 py-2">
                                    <div className="flex items-center justify-between">
                                        <input
                                            type="text"
                                            value={commentText}
                                            onChange={(e) =>
                                                setCommentText(e.target.value)
                                            }
                                            placeholder="Add a comment"
                                            className="w-full px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded-lg  focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-0"
                                        />
                                        <button
                                            onClick={() => {
                                                handleCommentOnPost(
                                                    post.id,
                                                    userId,
                                                    commentText
                                                )
                                            }}
                                            className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : loading ? (
                [...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="max-w-2xl mx-auto h-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                        <div className="py-4">
                            <div className="px-2 md:px-4 font-bold text-xl mb-2 flex items-center">
                                <Skeleton
                                    variant="text"
                                    width={150}
                                    height={24}
                                />
                            </div>
                            <p className="px-2 md:px-4 text-gray-700 lg:text-base text-sm">
                                <Skeleton
                                    variant="text"
                                    width="100%"
                                    height={80}
                                />
                            </p>
                            <div
                                className={`w-full h-auto md:px-4 md:rounded-lg mt-4 mb-2 `}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={300}
                                />
                            </div>
                        </div>
                        <div className="px-2 md:px-6 pt-2 lg:flex lg:flex-row-reverse justify-between flex flex-col-reverse pb-2 w-full">
                            <div className="space-x-2 flex justify-end mt-2">
                                <Skeleton
                                    variant="circle"
                                    width={24}
                                    height={24}
                                />
                                <button
                                    onClick={handleOpen}
                                    className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                                >
                                    <Skeleton
                                        variant="circle"
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            </div>
                            <div className="flex">
                                <Skeleton
                                    variant="circle"
                                    width={40}
                                    height={40}
                                />
                                <div>
                                    <Skeleton
                                        variant="text"
                                        width={100}
                                        height={20}
                                    />
                                </div>
                            </div>
                        </div>
                        {quantity && (
                            <div
                                className="px-6 pt-4 pb-2 flex items-center border-t-2"
                                style={{
                                    borderTopColor: '#1c274c',
                                }}
                            >
                                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-700 bg-gray-200 rounded-full">
                                    <Skeleton
                                        variant="text"
                                        width={20}
                                        height={16}
                                    />
                                </span>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="w-full flex justify-center top-32 text-2xl font-bold text-gray-500">
                    No Posts Available
                </div>
            )}
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

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className="flex justify-between py-4">
                        <Typography variant="h6" component="h2">
                            Share on
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            sx={{ color: 'red' }}
                            onClick={() => {
                                handleClose()
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        {socialMedia.map((social) => (
                            <div
                                key={social.name}
                                className="flex items-center justify-between px-4 py-2 my-2 bg-gray-200 rounded-lg"
                            >
                                <div className="flex items-center">
                                    {social.icon}
                                    <span className="ml-2">{social.name}</span>
                                </div>
                                <a
                                    href={`${social.url}${window.location.href}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <button className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none">
                                        Share
                                    </button>
                                </a>
                            </div>
                        ))}
                    </Box>
                </Box>
            </Modal>
            <Modal
                keepMounted
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={styleLogin}>
                    <div className="flex justify-between py-4">
                        <Typography variant="h6" component="h2">
                            Login to Continue
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            sx={{ color: 'red' }}
                            onClick={() => {
                                setOpenLogin(false)
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Box
                        sx={{
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            marginTop: '10px',
                        }}
                        className="space-y-2"
                    >
                        <button
                            onClick={handleSignWithGoogle}
                            className="px-4 py-2 flex justify-center w-full font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        >
                            <GoogleIcon
                                fill="none"
                                width="24"
                                height="24"
                                className="mr-1"
                            />
                            <span className="ml-2">Login with Google</span>
                        </button>
                        <Link
                            to={'/auth'}
                            className="px-4 py-2 flex justify-center w-full font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                        >
                            Login with Email and Password
                        </Link>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default Card
