import React, { useState, useEffect } from 'react'
const TopBar = React.lazy(() => import('../components/topBar/TopBar'))
const SideBar = React.lazy(() => import('../components/sideBar/SideBar'))

const Page = ({ children, title }) => {
    const [showSideBar, setShowSideBar] = useState(true)

    useEffect(() => {
        if (window.innerWidth < 640) {
            setShowSideBar(!showSideBar)
        }
    }, [window.innerWidth])

    return (
        <>
            <TopBar
                onClick={() => setShowSideBar(!showSideBar)}
                value={showSideBar}
            />
            <SideBar show={showSideBar} setShowSideBar={setShowSideBar} />
            <div
                className={`${
                    window.innerWidth < 764 ? 'p-2' : 'p-4'
                } sm:ml-64`}
            >
                <div className="mt-20 lg:mt-14 h-full lg:mx-6">
                    <div className="flex items-center justify-between mb-4">
                        {title && (
                            <h1 className="text-lg lg:text-4xl font-bold text-gray-800 dark:text-white">
                                {title}
                            </h1>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Page
