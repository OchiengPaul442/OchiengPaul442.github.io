import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { checkIfUserHasPhoneNumber } from '../backend/auth'
import UpdateDetails from '../components/upDateDetails/UpdateDetails'

const TopBar = React.lazy(() => import('../components/topBar/TopBar'))
const SideBar = React.lazy(() => import('../components/sideBar/SideBar'))

const Page = ({ children, title }) => {
    const [showSideBar, setShowSideBar] = useState(false)
    const uid = useSelector((state) => state.auth.user.uid)
    const token = useSelector((state) => state.auth.accessToken.token)
    const anonymous = useSelector((state) => state.auth.accessToken.anonymous)
    const [updateDetailsModal, setUpdateDetailsModal] = useState(false)

    useEffect(() => {
        if (uid && token && !anonymous) {
            setTimeout(async () => {
                const res = await checkIfUserHasPhoneNumber(uid)
                if (!res.hasPhoneNumber) {
                    setUpdateDetailsModal(true)
                } else {
                    setUpdateDetailsModal(false)
                }
            }, 10000)
        }
    }, [uid, token, anonymous])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640 && !showSideBar) {
                setShowSideBar(true)
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [showSideBar])

    return (
        <>
            <TopBar
                onClick={() => setShowSideBar(!showSideBar)}
                value={showSideBar}
            />
            <SideBar show={showSideBar} setShowSideBar={setShowSideBar} />
            <div className={`p-4 sm:ml-64`}>
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
            {!anonymous && token && (
                <UpdateDetails
                    open={updateDetailsModal}
                    handleClose={() => setUpdateDetailsModal(false)}
                />
            )}
        </>
    )
}

export default Page
