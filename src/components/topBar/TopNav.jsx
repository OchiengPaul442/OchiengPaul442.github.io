import React from 'react'

const TopNav = ({ handleCategory, categories }) => {
    return (
        <div
            className="inline-flex w-full justify-center rounded-md"
            role="group"
        >
            <button
                type="button"
                onClick={handleCategory('free')}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:text-white"
                style={{
                    backgroundColor: categories === 'free' && '#e1effe',
                    Color: categories === 'free' && 'black',
                }}
            >
                Free
            </button>
            <button
                type="button"
                onClick={handleCategory('borrow')}
                className=" inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:text-white"
                style={{
                    backgroundColor: categories === 'borrow' && '#e1effe',
                    Color: categories === 'borrow' && 'black',
                }}
            >
                Borrowed
            </button>
            <button
                type="button"
                onClick={handleCategory('wanted')}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:focus:text-white"
                style={{
                    backgroundColor: categories === 'wanted' && '#e1effe',
                    Color: categories === 'wanted' && 'black',
                }}
            >
                Wanted
            </button>
        </div>
    )
}

export default TopNav
