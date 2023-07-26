import React from 'react'
import Page from '../layout/Page'

const Mailbox = () => {
    const messages = [
        {
            id: 1,
            sender: 'John Doe',
            message:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            date: '2020-01-01',
        },
        {
            id: 2,
            sender: 'John Doe',
            message:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            photo: 'https://plus.unsplash.com/premium_photo-1675034393500-dc5fe64b527a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            date: '2020-01-01',
        },
        {
            id: 3,
            sender: 'John Doe',
            message:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            photo: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            date: '2020-01-01',
        },
        {
            id: 4,
            sender: 'John Doe',
            message:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            date: '2020-01-01',
        },
        {
            id: 5,
            sender: 'John Doe',
            message:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            date: '2020-01-01',
        },
    ]
    return (
        <Page title="Mailbox">
            <div className="flex h-full">
                <div className="w-1/4 h-full border-r border-gray-300">
                    {/* search field */}
                    <div className="p-4">
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 p-2"
                            placeholder="Search"
                        />
                    </div>
                    {/* list of chats */}
                    <div className="p-2 h-full">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="flex items-center my-4 hover:bg-gray-100 cursor-pointer p-2 rounded-lg"
                            >
                                <img
                                    className="w-12 h-12 rounded-full"
                                    src={
                                        message.photo ||
                                        'https://via.placeholder.com/150'
                                    }
                                    alt=""
                                />
                                <div className="flex flex-col ml-2 text-left">
                                    <span className="font-semibold">
                                        {message.sender}
                                    </span>
                                    <span>
                                        {message.message.substring(0, 20)}...
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-3/4">
                    <div className="p-4 h-full overflow-y-scroll">
                        {/* messages */}
                    </div>
                    <div className="p-4 border-t border-gray-300">
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 p-2"
                            placeholder="Write a message..."
                        />
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Mailbox
