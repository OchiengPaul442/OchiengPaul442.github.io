import React, { useState, useEffect } from 'react'
import { UpArrowIcon, DownArrowIcon } from '../icons/Icons'

const MessagePopup = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const messages = [
        {
            id: 1,
            photo: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            sender: 'John Doe',
            content: 'Hey there! How are you doing?',
        },
        {
            id: 2,
            photo: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            sender: 'Jane Smith',
            content: 'Just wanted to check in and see how things are going.',
        },
        {
            id: 3,
            photo: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            sender: 'Jane Smith',
            content: 'Just wanted to check in and see how things are going.',
        },
    ]

    return (
        window.innerWidth > 868 && (
            <div className="fixed bottom-2 right-2">
                <div
                    className={`mt-4 bg-white rounded-lg shadow-md p-4 w-80 transition-all duration-300 ease-in-out ${
                        isExpanded ? 'h-auto' : 'h-20'
                    }`}
                >
                    <div
                        id="messageHeader"
                        className="flex justify-between items-center mb-2 cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <h2 className="text-lg font-semibold text-gray-800">
                            Messages
                        </h2>
                        <button>
                            {isExpanded ? (
                                <DownArrowIcon
                                    width={24}
                                    height={24}
                                    fill="orange"
                                />
                            ) : (
                                <UpArrowIcon
                                    width={24}
                                    height={24}
                                    fill="orange"
                                />
                            )}
                        </button>
                    </div>
                    {isExpanded && (
                        <div className="overflow-y-scroll scrollbar-hide">
                            {messages.map((message) => (
                                <button
                                    key={message.id}
                                    className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                                >
                                    <img
                                        src={message.photo}
                                        alt=""
                                        className="w-10 h-10 rounded-full mr-2"
                                    />
                                    <div>
                                        <h3 className="text-left text-sm font-semibold text-gray-600">
                                            {message.sender}
                                        </h3>
                                        <p className="text-left text-sm text-gray-500">
                                            {message.content}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    )
}

export default MessagePopup
