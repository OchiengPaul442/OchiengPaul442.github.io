import './App.css'
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('./views/Home'))
const Forum = React.lazy(() => import('./views/Forum'))
const Eror404 = React.lazy(() => import('./views/404'))

const App = () => {
    return (
        <>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="*" element={<Eror404 />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    )
}

export default App
