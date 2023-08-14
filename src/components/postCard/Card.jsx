import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { ShareIcon, CommentIcon, LikeIcon } from '../icons/Icons'

const Card = ({
    post,
    comment: comment = false,
    quantity: quantity = false,
}) => {
    return (
        <div
            key={post.id}
            className="max-w-3xl mx-auto h-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 flex items-center">
                    <h1>Product Name</h1>
                </div>
                <p className="text-gray-700 lg:text-base text-sm">
                    {post.content}
                </p>
                <div className={`w-full h-auto rounded-lg mt-4 mb-2 `}>
                    <Carousel
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        infiniteLoop
                        autoPlay
                        swipeable
                        emulateTouch
                    >
                        {post.images.map((image, index) => (
                            <img
                                key={index}
                                className="w-full h-full object-cover rounded-lg"
                                src={image}
                                alt=""
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className="px-6 pt-2 lg:flex lg:flex-row-reverse justify-between flex flex-col-reverse pb-2 w-full">
                <div className="space-x-2 flex justify-end mt-2">
                    <button className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        <LikeIcon fill="none" width="24" height="24" />
                        <span className="ml-2">like</span>
                    </button>
                    {comment && (
                        <button className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            <CommentIcon
                                fill="none"
                                width="24"
                                height="24"
                                className="mr-1"
                            />
                            <span className="ml-2">comment</span>
                        </button>
                    )}
                    <button className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        <ShareIcon fill="none" width="24" height="24" />
                        <span className="ml-2">share</span>
                    </button>
                </div>
                <div className="flex">
                    <img
                        className="w-8 h-8 rounded-full mr-4"
                        src={post.photo}
                        alt=""
                    />
                    <div>
                        <h4>{post.Name}</h4>
                        <p className="text-gray-400  text-sm">{post.Date}</p>
                    </div>
                </div>
            </div>
            {quantity && (
                <div className="px-6 pt-4 pb-2 flex items-center border-t-2">
                    Quantity available:
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-700 bg-gray-200 rounded-full">
                        2
                    </span>
                </div>
            )}
        </div>
    )
}

export default Card
