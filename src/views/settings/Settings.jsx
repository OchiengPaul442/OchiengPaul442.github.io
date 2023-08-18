import React from 'react'
import Page from '../../layout/Page'
import { useSelector } from 'react-redux'

const Settings = () => {
    const displayName = useSelector((state) => state.auth.user.displayName)
    const email = useSelector((state) => state.auth.user.email)

    return (
        <Page title="Account Settings">
            <p>User: {displayName}</p>
            <p>Email: {email}</p>
        </Page>
    )
}

export default Settings
