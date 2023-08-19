import React from 'react'
import Page from '../../layout/Page'
import { useSelector } from 'react-redux'

const Settings = () => {
    const displayName = useSelector((state) => state.auth.user.displayName)
    const email = useSelector((state) => state.auth.user.email)

    return (
        <Page title="Account Settings">
            {/* grid with two columns responsive also */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-4">
                <div className="col-span-1">
                    <div className="text-2xl font-bold text-gray-500">
                        Password & Security Reset
                    </div>
                    <div className="text-gray-500">Reset your password</div>

                    <div className="mt-4">
                        <div className="text-gray-500">Old Password</div>
                        <div className="text-gray-500">********</div>
                    </div>

                    <div className="mt-4">
                        <div className="text-gray-500">Password</div>
                        <div className="text-gray-500">********</div>
                    </div>

                    <div className="mt-4">
                        <div className="text-gray-500">Confirm Password</div>
                        <div className="text-gray-500">********</div>
                    </div>
                    {/* button */}
                    <div className="mt-4">
                        <button className="bg-red-700 text-white px-4 py-2 rounded-md">
                            Reset Password
                        </button>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="text-2xl font-bold text-gray-500">
                        Account Settings
                    </div>
                    <div className="text-gray-500">
                        Manage your account settings and set email preferences
                    </div>

                    <div className="mt-4">
                        <div className="text-gray-500">Display Name</div>
                        <div className="text-gray-500">{displayName}</div>
                    </div>

                    <div className="mt-4">
                        <div className="text-gray-500">Email</div>
                        <div className="text-gray-500">{email}</div>
                    </div>
                    {/* button */}
                    <div className="mt-4">
                        <button className="bg-slate-700 text-white px-4 py-2 rounded-md">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Settings
