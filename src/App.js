import './App.css'
import React, { Suspense } from 'react'
import { Loader } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Auth = React.lazy(() => import('./views/auth/Auth'))
const Home = React.lazy(() => import('./views/Home'))
const Forum = React.lazy(() => import('./views/Forum'))
const Eror404 = React.lazy(() => import('./views/404'))

const App = () => {
    return (
        <>
            <Router>
                <Suspense
                    fallback={
                        <div className="flex justify-center items-center h-screen">
                            <Loader width="200" height="200" />
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/community_box" element={<Auth />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="*" element={<Eror404 />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    )
}

export default App
