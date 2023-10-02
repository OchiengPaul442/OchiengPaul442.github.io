import React, { useState } from 'react'
import { Slide } from '@mui/material'
import { useSelector } from 'react-redux'
import Comintro from '../../assets/images/comintro.jpg'
import { updateUserDetails } from '../../backend/auth'

// Define the transition styles
const TransitionSlide = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})

const UpdateDetails = ({ open, handleClose }) => {
    const uid = useSelector((state) => state.auth.user.uid)
    const [disabled, setDisabled] = useState(false)
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        country: '',
        location: '',
        phoneNumber: '',
    })

    const validateField = (id, value) => {
        let error = ''
        if (value.trim() === '') {
            error = 'This field is required'
        } else if (
            id === 'phoneNumber' &&
            (!/^\+?[1-9]\d{1,14}$/.test(value) || value.length < 10)
        ) {
            error =
                'Please enter a valid phone number with at least 10 digits e.g+256xxxx'
        }
        return error
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        const error = validateField(id, value)
        setValues((prevValues) => ({ ...prevValues, [id]: value }))
        setErrors((prevErrors) => ({ ...prevErrors, [id]: error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Validate fields before submitting
        let isValid = true
        const newErrors = {}
        for (let field in values) {
            const error = validateField(field, values[field])
            newErrors[field] = error
            if (error) {
                isValid = false
            }
        }
        setErrors(newErrors)

        // If no errors, submit the form
        if (isValid) {
            setDisabled(true)
            updateUserDetails(uid, values)
                .then(() => {
                    handleClose()
                })
                .catch((err) => {
                    console.log(err)
                    setDisabled(false)
                })
        } else {
            console.log('Invalid form submission')
        }
    }

    return (
        <div
            style={{
                margin: 0,
                padding: '10px',
                display: open ? 'block' : 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
            }}
        >
            <TransitionSlide in={open}>
                <div
                    style={{
                        backgroundColor: 'white',
                        maxWidth: '850px',
                        width: '100%',
                        height: 'auto',
                        margin: '50px auto',
                        borderRadius: '10px',
                    }}
                >
                    <div className="lg:grid lg:grid-cols-2 lg:gap-0 p-0 m-0 w-full">
                        <div
                            style={{
                                height: window.innerWidth <= 768 ? '200px' : '',
                            }}
                            className="flex-1 relative lg:h-auto"
                        >
                            <img
                                style={{
                                    height:
                                        window.innerWidth <= 768 ? '200px' : '',
                                }}
                                src={Comintro}
                                alt="Community"
                                className="w-full h-auto object-cover"
                            />
                            <div
                                style={{
                                    display:
                                        window.innerWidth <= 768 ? 'none' : '',
                                    background:
                                        window.innerWidth <= 768
                                            ? ''
                                            : 'linear-gradient(to top, rgba(28,39,76,0.8) 40%, rgba(28,39,76,0) 100%)',
                                }}
                                className="xs:bg-gradient-to-t from-blue-900 via-blue-900 to-transparent lg:bg-gradient-to-t lg:absolute lg:bottom-0 lg:right-0 text-white p-5 text-3xl"
                            >
                                Thank you for joining our community! Please
                                update your details before proceeding.
                            </div>
                        </div>

                        <div
                            style={{
                                flex: window.innerWidth <= 768 ? '' : '1 1 50%',
                                padding: window.innerWidth <= 768 ? '' : '1em',
                            }}
                        >
                            <form
                                style={{
                                    padding:
                                        window.innerWidth <= 768 ? '1em' : '',
                                }}
                                onSubmit={handleSubmit}
                            >
                                <h2
                                    style={{
                                        color: 'black',
                                        marginBottom: '1em',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '1.5em',
                                            textAlign: 'left',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            lineHeight: '1.0em',
                                        }}
                                    >
                                        Welcome to Our Community!
                                    </span>
                                    <small className="mt-2">
                                        Complete your profile to continue.
                                    </small>
                                </h2>
                                <div
                                    style={{
                                        marginBottom:
                                            window.innerWidth <= 768
                                                ? ''
                                                : '5px',
                                    }}
                                >
                                    <label
                                        htmlFor="country"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        value={values.country}
                                        onChange={handleChange}
                                        className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                            errors.country
                                                ? 'border-red-500'
                                                : ''
                                        }`}
                                        onBlur={(e) =>
                                            validateField(
                                                e.target.id,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.country && (
                                        <small style={{ color: 'red' }}>
                                            {errors.country}
                                        </small>
                                    )}
                                </div>
                                <div
                                    style={{
                                        marginBottom:
                                            window.innerWidth <= 768
                                                ? ''
                                                : '5px',
                                    }}
                                >
                                    <label
                                        htmlFor="location"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Address / location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        value={values.location}
                                        onChange={handleChange}
                                        className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                            errors.location
                                                ? 'border-red-500'
                                                : ''
                                        }`}
                                        onBlur={(e) =>
                                            validateField(
                                                e.target.id,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.location && (
                                        <small style={{ color: 'red' }}>
                                            {errors.location}
                                        </small>
                                    )}
                                </div>
                                <div
                                    style={{
                                        marginBottom:
                                            window.innerWidth <= 768
                                                ? ''
                                                : '5px',
                                    }}
                                >
                                    <label
                                        htmlFor="phoneNumber"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                            errors.phoneNumber
                                                ? 'border-red-500'
                                                : ''
                                        }`}
                                        onBlur={(e) =>
                                            validateField(
                                                e.target.id,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.phoneNumber && (
                                        <small style={{ color: 'red' }}>
                                            {errors.phoneNumber}
                                        </small>
                                    )}
                                </div>
                                {/* Add more fields as necessary */}
                                <div className="flex justify-end w-full">
                                    <button
                                        type="submit"
                                        className={`${
                                            disabled
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-green-600 hover:bg-green-700'
                                        } w-full py-2 mt-4 text-sm font-medium text-white transition duration-300 ease-in-out transform rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                                    >
                                        Update Details
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </TransitionSlide>
        </div>
    )
}

export default UpdateDetails
