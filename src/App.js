import './App.css'
import React, { Suspense } from 'react'
import { Loader } from './components'
import store from './reduxStore/categories'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Auth = React.lazy(() => import('./views/auth/Auth'))
const Home = React.lazy(() => import('./views/Home'))
const Forum = React.lazy(() => import('./views/Forum'))
const Mailbox = React.lazy(() => import('./views/Mailbox'))
const Eror404 = React.lazy(() => import('./views/404'))

const App = () => {
    return (
        <>
            <Provider store={store}>
                <Router>
                    <Suspense
                        fallback={
                            <div className="flex justify-center items-center h-screen">
                                <Loader width="200" height="200" />
                            </div>
                        }
                    >
                        <Routes>
                            <Route path="/community_box" element={<Home />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/forum" element={<Forum />} />
                            <Route path="/mailbox" element={<Mailbox />} />
                            <Route path="*" element={<Eror404 />} />
                        </Routes>
                    </Suspense>
                </Router>
            </Provider>
        </>
    )
}

export default App
