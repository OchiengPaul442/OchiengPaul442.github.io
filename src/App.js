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
        const fetchUserDetails = async () => {
            if (accessToken && !anonymous && uid) {
                const response = await getUserDetails(uid)

                if (response.success) {
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
            }
        }

        fetchUserDetails()
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
