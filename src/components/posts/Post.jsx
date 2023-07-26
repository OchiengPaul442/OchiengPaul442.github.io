import React from 'react'
import { AddIcon } from '../icons/Icons'
import { Link } from 'react-router-dom'

const Post = () => {
    return (
        <div className="flex flex-col mb-4 p-4 bg-white rounded-lg shadow-md">
            <div className="items-center flex">
                <img
                    className="w-12 h-12 rounded-full mr-4"
                    src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                />
                <input
                    type="text"
                    placeholder="Start a post"
                    className="w-full rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex flex-row justify-end items-center mt-2 ml-4">
                <Link className="flex items-center mr-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            // handle file upload
                            const file = event.target.files[0]
                            console.log(file)
                        }}
                        className="hidden"
                        id="image-upload"
                    />
                    <label
                        htmlFor="image-upload"
                        className="flex items-center cursor-pointer"
                    >
                        <AddIcon fill="blue" width="24" height="24" />
                        <span className="ml-1 text-gray-600">Photo</span>
                    </label>
                </Link>
            </div>
        </div>
    )
}

export default Post
