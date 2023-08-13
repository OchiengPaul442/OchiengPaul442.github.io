import React from 'react'
const TopBar = React.lazy(() => import('../components/topBar/TopBar'))
const SideBar = React.lazy(() => import('../components/sideBar/SideBar'))

const Page = ({ children, title }) => {
    const [showSideBar, setShowSideBar] = React.useState(true)

    React.useEffect(() => {
        if (window.innerWidth < 640) {
            setShowSideBar(!showSideBar)
        }
    }, [window.innerWidth])

    return (
        <>
            <TopBar onClick={() => setShowSideBar(!showSideBar)} />
            <SideBar show={showSideBar} />
            <div
                className={`${
                    window.innerWidth < 764 ? 'p-2' : 'p-4'
                } sm:ml-64`}
            >
                <div className="mt-14">
                    <div className="flex items-center justify-between mb-4">
                        {title && (
                            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
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
