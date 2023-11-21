import React from 'react'
import Skeleton from '@mui/material/Skeleton'

const CardSkeleton = ({ quantity }) => {
    return [...Array(5)].map((_, index) => (
        <div
            key={index}
            className="max-w-2xl mx-auto h-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <div className="py-4">
                <div className="px-2 md:px-4 font-bold text-xl mb-2 flex items-center">
                    <Skeleton variant="text" width={150} height={24} />
                </div>
                <p className="px-2 md:px-4 text-gray-700 lg:text-base text-sm">
                    <Skeleton variant="text" width="100%" height={80} />
                </p>
                <div
                    className={`w-full h-auto md:px-4 md:rounded-lg mt-4 mb-2 `}
                >
                    <Skeleton variant="rectangular" width="100%" height={300} />
                </div>
            </div>
            <div className="px-2 md:px-6 pt-2 lg:flex lg:flex-row-reverse justify-between flex flex-col-reverse pb-2 w-full">
                <div className="space-x-2 flex justify-end mt-2">
                    <Skeleton variant="circle" width={24} height={24} />
                    <button
                        type="button"
                        className="inline-flex hover:bg-gray-400 items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                    >
                        <Skeleton variant="circle" width={24} height={24} />
                    </button>
                </div>
                <div className="flex">
                    <Skeleton variant="circle" width={40} height={40} />
                    <div>
                        <Skeleton variant="text" width={100} height={20} />
                    </div>
                </div>
            </div>
            {quantity && (
                <div
                    className="px-6 pt-4 pb-2 flex items-center border-t-2"
                    style={{
                        borderTopColor: '#1c274c',
                    }}
                >
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-700 bg-gray-200 rounded-full">
                        <Skeleton variant="text" width={20} height={16} />
                    </span>
                </div>
            )}
        </div>
    ))
}

export default CardSkeleton
