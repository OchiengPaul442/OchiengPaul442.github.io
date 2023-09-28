import React, { useState } from 'react'
import Page from '../../layout/Page'
import { useSelector } from 'react-redux'
import { Loader } from '../../components'
import { updateUserDetails, changePassword } from '../../backend/auth'
import Alert from '@mui/material/Alert'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Settings = () => {
    const userId = useSelector((state) => state.auth.user.uid)
    const displayName = useSelector((state) => state.auth.user.displayName)
    const email = useSelector((state) => state.auth.user.email)
    const country = useSelector((state) => state.auth.user.country)
    const location = useSelector((state) => state.auth.user.location)
    const phoneNumber = useSelector((state) => state.auth.user.phoneNumber)
    const [state, setState] = useState({
        displayName: displayName,
        email: email,
        country: country,
        location: location,
        phoneNumber: phoneNumber,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [checks, setChecks] = useState({
        update: false,
        pwd: false,
    })

    const [loading, setLoading] = useState({
        pwd: false,
        delete: false,
        update: false,
    })

    const [errors, setErrors] = useState({})

    const [showPassword, setShowPassword] = useState({})

    const togglePasswordVisibility = (id) => {
        setShowPassword({ ...showPassword, [id]: !showPassword[id] })
    }

    const validateField = (name, value) => {
        if (value.trim() === '') {
            return `${name} is required`
        } else if (name === 'email') {
            const re = /\S+@\S+\.\S+/
            if (!re.test(value)) {
                return 'Email address is invalid'
            }
        } else if (name === 'phoneNumber') {
            const re = /^\+?\d+$/
            if (!re.test(value)) {
                return 'Phone number is invalid'
            }
        } else if (name === 'password') {
            if (value.length < 6) {
                return 'Password must be at least 6 characters'
            }
        } else if (name === 'confirmPassword') {
            if (value !== state.newPassword) {
                return 'Passwords do not match'
            }
        }
        return ''
    }

    const clearChange = () => {
        setState({
            displayName: displayName,
            email: email,
            country: country,
            location: location,
            phoneNumber: phoneNumber,
        })
        setChecks({
            update: false,
        })
    }

    const clearPwdChange = () => {
        setState({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        })
        setChecks({
            pwd: false,
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const newState = { ...state, [name]: value }
        setState(newState)
        handleErrors(e)

        const fields = [
            'displayName',
            'email',
            'country',
            'location',
            'phoneNumber',
            'oldPassword',
            'newPassword',
            'confirmPassword',
        ]
        const checks = fields.some((field) => newState[field] !== state[field])
        if (checks) {
            if (
                name !== 'oldPassword' &&
                name !== 'newPassword' &&
                name !== 'confirmPassword'
            ) {
                setChecks({
                    update: true,
                })
            } else {
                setChecks({
                    pwd: true,
                })
            }
        }
    }

    const handleErrors = (e) => {
        const { name, value } = e.target
        setErrors({ ...errors, [name]: validateField(name, value) })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        // Validate fields before submitting
        const isValid = !Object.values(errors).some(Boolean)
        // If no errors, submit the form
        if (isValid) {
            setLoading({ ...loading, update: true })
            const userData = {
                displayName: state.displayName,
                email: state.email,
                country: state.country,
                location: state.location,
                phoneNumber: state.phoneNumber,
            }
            try {
                await updateUserDetails(userId, userData)
                setLoading({ ...loading, update: false })
                setChecks({
                    update: false,
                })
                setErrors({
                    general: 'Profile updated successfully',
                    type: 'success',
                    form: 'update',
                })
            } catch (err) {
                console.log(err)
                setLoading({ ...loading, update: false })
                setErrors({
                    general: err.message,
                    type: 'error',
                    form: 'update',
                })
            }
        }
    }

    const handlePwdChange = async (e) => {
        e.preventDefault()
        // Validate fields before submitting
        const isValid = !Object.values(errors).some(Boolean)
        // If no errors, submit the form
        if (isValid) {
            setLoading({ ...loading, pwd: true })
            const pwdData = {
                oldPassword: state.oldPassword,
                newPassword: state.newPassword,
            }
            try {
                await changePassword(
                    email,
                    pwdData.oldPassword,
                    pwdData.newPassword
                )
                    .then(() => {
                        setLoading({ ...loading, pwd: false })
                        clearPwdChange()
                    })
                    .catch((err) => {
                        setLoading({ ...loading, pwd: false })
                        setErrors({
                            general: err.message,
                            type: 'error',
                            form: 'pwd',
                        })
                    })
            } catch (err) {
                console.log(err)
                setLoading({ ...loading, pwd: false })
                setErrors({
                    general: err.message,
                    type: 'error',
                    form: 'pwd',
                })
            }
        }
    }

    return (
        <Page title="Account Settings">
            {/* grid with two columns responsive also */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-4">
                <div className="col-span-1">
                    <form
                        onSubmit={handleUpdate}
                        className="flex flex-col gap-4"
                    >
                        <h2 className="text-2xl font-bold text-gray-500">
                            Profile Details
                        </h2>
                        <p className="text-gray-500">
                            Change your profile details
                        </p>

                        {errors.general && errors.form === 'update' && (
                            <Alert
                                severity={errors.type}
                                onClose={() =>
                                    setErrors({ ...errors, general: '' })
                                }
                                sx={{ mt: 2 }}
                            >
                                {errors.general}
                            </Alert>
                        )}

                        <div className="mt-4">
                            <label
                                htmlFor="displayName"
                                className="text-gray-500"
                            >
                                Display Name
                            </label>
                            <input
                                type="text"
                                id="displayName"
                                name="displayName"
                                value={state.displayName}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                    errors.displayName ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.displayName && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.displayName}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="email" className="text-gray-500">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="country" className="text-gray-500">
                                Country
                            </label>
                            <input
                                type="text"
                                id="_country"
                                name="country"
                                value={state.country}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                    errors.country ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.country && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.country}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="location" className="text-gray-500">
                                Address / location
                            </label>
                            <input
                                type="text"
                                id="_location"
                                name="location"
                                value={state.location}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                    errors.location ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.location && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.location}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="phoneNumber"
                                className="text-gray-500"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone_Number"
                                name="phoneNumber"
                                value={state.phoneNumber}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                    errors.phoneNumber ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </div>

                        {/* button */}
                        <div className="mt-4 flex items-center gap-2">
                            {loading.update ? (
                                <Loader width={200} height={200} />
                            ) : (
                                <button
                                    className="bg-green-700 text-white px-4 py-2 rounded-md"
                                    onClick={handleUpdate}
                                >
                                    Save Changes
                                </button>
                            )}

                            {/* if state is in intial state dont show else show */}
                            {checks.update && (
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={clearChange}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div className="col-span-1">
                    <form className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-gray-500">
                            Password & Security Reset
                        </h2>
                        <p className="text-gray-500">Change your password</p>

                        {errors.general && errors.form === 'pwd' && (
                            <Alert
                                severity={errors.type}
                                onClose={() =>
                                    setErrors({ ...errors, general: '' })
                                }
                                sx={{ mt: 2 }}
                            >
                                {errors.general}
                            </Alert>
                        )}

                        <div className="mt-4">
                            <label
                                htmlFor="newPassword"
                                className="text-gray-500"
                            >
                                Old Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showPassword['oldpassword']
                                            ? 'text'
                                            : 'password'
                                    }
                                    id="oldpassword"
                                    name="oldPassword"
                                    value={state.oldPassword}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                        errors.newPassword
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                />
                                <div
                                    onClick={() =>
                                        togglePasswordVisibility('oldpassword')
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                >
                                    {showPassword['oldpassword'] ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </div>
                            </div>
                            {errors.newPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.newPassword}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="newPassword"
                                className="text-gray-500"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showPassword['newPassword']
                                            ? 'text'
                                            : 'password'
                                    }
                                    id="newPassword"
                                    name="newPassword"
                                    value={state.newPassword}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                        errors.newPassword
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                />
                                <div
                                    onClick={() =>
                                        togglePasswordVisibility('newPassword')
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                >
                                    {showPassword['newPassword'] ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </div>
                            </div>
                            {errors.newPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.newPassword}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="confirmPassword"
                                className="text-gray-500"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showPassword['confirmPassword']
                                            ? 'text'
                                            : 'password'
                                    }
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={state.confirmPassword}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                                        errors.confirmPassword
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                />
                                <div
                                    onClick={() =>
                                        togglePasswordVisibility(
                                            'confirmPassword'
                                        )
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                >
                                    {showPassword['confirmPassword'] ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* button */}
                        <div className="mt-4">
                            <button
                                onClick={handlePwdChange}
                                className="bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                {loading.pwd ? (
                                    <Loader width={200} height={200} />
                                ) : (
                                    ' Reset password'
                                )}
                            </button>

                            {checks.pwd && (
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md ml-4"
                                    onClick={clearPwdChange}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Page>
    )
}

export default Settings
