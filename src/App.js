import React, { Suspense, useEffect, useState } from 'react'
import { Loader } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from './backend/auth'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import { signInUserAnonymously } from './backend/auth'

const loadComponent = (component) => {
    return React.lazy(() => import(`./views/${component}`))
}

const Auth = loadComponent('auth/Auth')
const Home = loadComponent('Home/Home')
const Forum = loadComponent('Forum/Forum')
const Settings = loadComponent('settings/Settings')
const Eror404 = loadComponent('404')

const App = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.auth?.accessToken?.token)
    const anonymous = useSelector((state) => state.auth?.accessToken?.anonymous)
    const uid = useSelector((state) => state.auth?.accessToken?.uid)

    const [status, setStatus] = useState(navigator.onLine)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        function changeStatus() {
            setStatus(navigator.onLine)
            setOpen(true)
        }
        window.addEventListener('online', changeStatus)
        window.addEventListener('offline', changeStatus)
        return () => {
            window.removeEventListener('online', changeStatus)
            window.removeEventListener('offline', changeStatus)
        }
    }, [])

    useEffect(() => {
        let isCancelled = false

        const fetchUserDetails = async () => {
            if (accessToken && !anonymous && uid && status) {
                const response = await getUserDetails(uid)

                if (!isCancelled && response.success) {
                    dispatch({
                        type: 'SET_USER',
                        payload: {
                            displayName: response.user.displayName,
                            email: response.user.email,
                            photoURL: response.user.photoURL,
                            uid: response.user.uid,
                            country: response.user.country,
                            location: response.user.location,
                            phoneNumber: response.user.phoneNumber,
                        },
                    })
                } else if (!isCancelled) {
                    dispatch({
                        type: 'SET_USER',
                        payload: {
                            displayName: 'N/A',
                            email: 'N/A',
                            photoURL: 'N/A',
                            uid: 'N/A',
                            country: 'N/A',
                            location: 'N/A',
                            phoneNumber: 'N/A',
                        },
                    })
                }
            }
        }

        // handle anonymous login
        const handleAnonymousLogin = async () => {
            try {
                const res = await signInUserAnonymously()
                if (res.success === true) {
                    dispatch({
                        type: 'SET_USER',
                        payload: {
                            displayName: res.user.displayName,
                            email: res.user.email,
                            photoURL: res.user.photoURL,
                            uid: res.user.uid,
                        },
                    })

                    dispatch({
                        type: 'SET_ACCESS_TOKEN',
                        payload: {
                            uid: res.user.uid,
                            token: res.accessToken,
                            anonymous: res.anonymous,
                        },
                    })
                    console.log('Anonymous Login Successful', res)
                } else {
                    alert(res.message)
                }
            } catch (error) {
                console.log(error)
            }
        }

        handleAnonymousLogin()
        fetchUserDetails()

        return () => {
            isCancelled = true
        }
    }, [dispatch, accessToken, anonymous, uid, status])

    return (
        <Router>
            <Suspense
                fallback={
                    <div className="flex justify-center items-center h-screen">
                        <Loader width="250" height="250" />
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<Eror404 />} />
                </Routes>
            </Suspense>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                TransitionComponent={Slide}
                transitionDuration={{ enter: 500, exit: 500 }}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity={status ? 'success' : 'error'}
                >
                    {status ? 'Online' : 'Offline'}
                </Alert>
            </Snackbar>
        </Router>
    )
}

export default App
