import './App.css'
import React, { Suspense, useEffect } from 'react'
import { Loader } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from './backend/auth'

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
    const accessToken = useSelector((state) => state.auth.accessToken.token)
    const anonymous = useSelector((state) => state.auth.accessToken.anonymous)
    const uid = useSelector((state) => state.auth.accessToken.uid)

    useEffect(() => {
        // Check if accessToken and anonymous are set
        if (accessToken && !anonymous && uid) {
            // Use the getUserDetails function with a callback
            const unsubscribe = getUserDetails(uid, ({ success, user }) => {
                if (success) {
                    dispatch({
                        type: 'SET_USER',
                        payload: {
                            displayName: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                            uid: user.uid,
                            country: user.country,
                            location: user.location,
                            phoneNumber: user.phoneNumber,
                        },
                    })
                } else {
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
            })

            // Cleanup function to stop listening for updates
            return () => unsubscribe()
        }
    }, [dispatch, accessToken, anonymous, uid])

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
        </Router>
    )
}

export default App
