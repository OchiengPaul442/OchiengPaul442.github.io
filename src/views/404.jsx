import React from 'react'
import { Link } from 'react-router-dom'

const Eror404 = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mb-6">
                    This page couldnt be found.
                </h2>
                <p className="text-gray-500 mb-8">
                    The page you are looking for may have been moved or deleted.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600"
                >
                    Go back home
                </Link>
            </div>
        </div>
    )
}

export default Eror404
