import React from 'react'
import { CloseIcon } from '../icons/Icons'

const MessagingSection = ({ message, close }) => {
    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <img
                        src={message.photo}
                        alt=""
                        className="w-10 h-10 rounded-full mr-2"
                    />
                    <h2 className="text-lg font-semibold text-gray-800">
                        {message.sender}
                    </h2>
                </div>
                <button
                    onClick={close}
                    className="text-gray-600 hover:text-gray-800"
                >
                    <CloseIcon width={24} height={24} fill="orange" />
                </button>
            </div>
            <div className="flex-grow overflow-y-scroll scrollbar-hide">
                {message.content}
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Write a message..."
                    className="w-full border rounded-lg p-2"
                />
            </div>
        </div>
    )
}

export default MessagingSection
