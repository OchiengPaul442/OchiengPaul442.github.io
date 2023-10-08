import React, { useState } from 'react'
import '../../assets/styles/main.scss'
import Signup from '../../assets/images/signup.svg'
import Login from '../../assets/images/login.svg'
import Forgotpwd from '../../assets/images/forgotpwd.svg'
import { Link } from 'react-router-dom'
import useGoogleSignIn from '../../components/GoogleSignin'
import { useDispatch } from 'react-redux'
import { GoogleIcon, Loader } from '../../components'
import { Button, Alert } from '@mui/material'
import {
    registerWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInUserAnonymously,
    resetPassword,
} from '../../backend/auth/index.js'
import CommunityLogo from '../../assets/icons/logo.png'

const Auth = () => {
    const dispatch = useDispatch()
    const [formState, setFormState] = useState('login')
    const [loading, setLoading] = useState({
        login: false,
        signup: false,
        forgotpwd: false,
        anonymous: false,
    })

    const [disabled, setDisabled] = useState(true)
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({
        message: '',
        show: false,
        type: 'error',
        form: '',
    })

    const { handleSignWithGoogle } = useGoogleSignIn()

    const clearForm = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
    }

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
    }

    const handleAnonymousLogin = async () => {
        try {
            setLoading({ ...loading, anonymous: true })
            const res = await signInUserAnonymously()
            if (res.success === true) {
                dispatch({
                    type: 'SET_USER',
                    payload: {
                        displayName: res.user.displayName,
                        email: res.user.email,
                        photoURL: res.user.photoURL,
                        uid: res.user.uid,
                    },
                })

                dispatch({
                    type: 'SET_ACCESS_TOKEN',
                    payload: {
                        uid: res.user.uid,
                        token: res.accessToken,
                        anonymous: res.anonymous,
                    },
                })
                // navigate to home page
                window.location.href = '/'
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading({ ...loading, anonymous: false })
        }
    }

    const setErrorState = (message, type, form) => {
        setError({
            ...error,
            show: true,
            message,
            type,
            form: form,
        })
    }

    const handleForgotPassword = async () => {
        try {
            // check if email is empty and validate email
            if (email === '') {
                setErrorState('Email is required', 'error')
                return
            } else if (!validateEmail(email)) {
                setErrorState('Invalid Email', 'error')
                return
            }

            setLoading({ ...loading, forgotpwd: true })

            const res = await resetPassword(email)

            if (res.success === true) {
                setErrorState(res.message, 'success', 'forgotpwd')
            } else {
                setErrorState(res.message, 'error', 'forgotpwd')
            }

            setEmail('')
        } catch {
            setErrorState(
                'We are unable to process your request at this time. Please try again later.',
                'error',
                'forgotpwd'
            )
        } finally {
            setLoading({ ...loading, forgotpwd: false })
        }
    }

    const handleLogin = async () => {
        try {
            if (email === '' || password === '') {
                setErrorState('All fields are required', 'error', 'login')
                return
            }

            setLoading({ ...loading, login: true })
            const res = await signInWithEmailAndPassword(email, password)
            if (res.success === true) {
                dispatch({
                    type: 'SET_ACCESS_TOKEN',
                    payload: {
                        uid: res.user.uid,
                        token: res.accessToken,
                        anonymous: res.anonymous,
                    },
                })

                clearForm()

                // navigate to home page
                window.location.href = '/'
            } else {
                setErrorState('Invalid Credentials', 'error', 'login')
            }
        } catch (error) {
            setErrorState(
                'We are unable to process your request at this time. Please try again later.',
                'error',
                'login'
            )
        } finally {
            setLoading({ ...loading, login: false })
        }
    }

    const handleRegistration = async () => {
        try {
            if (displayName === '' || email === '' || password === '') {
                setErrorState('All fields are required', 'error', 'signup')
                return
            }

            setLoading({ ...loading, signup: true })
            const res = await registerWithEmailAndPassword(
                displayName,
                email,
                password
            )
            if (res.success === true) {
                dispatch({
                    type: 'SET_ACCESS_TOKEN',
                    payload: {
                        uid: res.user.uid,
                        token: res.accessToken,
                        anonymous: res.anonymous,
                    },
                })

                clearForm()

                // navigate to home page
                window.location.href = '/'
            } else {
                setErrorState('Email already exists', 'error', 'signup')
            }
        } catch (error) {
            setErrorState(
                'We are unable to process your request at this time. Please try again later.',
                'error',
                'signup'
            )
        } finally {
            setLoading({ ...loading, signup: false })
        }
    }

    const handleSignupClick = () => {
        clearForm()
        setFormState('signup')
        document.getElementById('color1').classList.add('change1')
        document.getElementById('color2').classList.add('change2')
        document.getElementById('othersec').classList.add('change3')
        document.getElementById('formcard').classList.add('change4')
    }

    const handleSigninClick = () => {
        clearForm()
        setFormState('login')
        document.getElementById('color1').classList.remove('change1')
        document.getElementById('color2').classList.remove('change2')
        document.getElementById('othersec').classList.remove('change3')
        document.getElementById('formcard').classList.remove('change4')
    }

    const handleForgotPasswordClick = () => {
        clearForm()
        setFormState('forgotpwd')
        document.getElementById('color1').classList.add('change1')
        document.getElementById('color2').classList.add('change2')
        document.getElementById('othersec').classList.add('change3')
        document.getElementById('formcard').classList.add('change4')
    }

    return (
        <>
            <div className="con_colors">
                <div id="color1"></div>
                <div id="color2"></div>
            </div>
            {/* Link to visit the community */}
            <div
                style={{
                    width: 'fit-content',
                    paddingBottom: '10px',
                    paddingTop: '15px',
                    paddingLeft: '20px',
                    paddingRight: '10px',
                    backgroundColor: 'orange',
                    borderRadius: '0.5rem',
                    position: 'absolute',
                    top: '3.5rem',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                }}
                className="shadow-md"
            >
                <button onClick={handleAnonymousLogin} className="text-white">
                    {loading.anonymous ? (
                        <Loader width={200} height={200} />
                    ) : (
                        'Visit Community'
                    )}
                </button>
            </div>
            <div className="auth_card" id="authCard">
                <div
                    id="formcard"
                    className="form_card flex flex-col justify-center"
                >
                    <h1 className="text-2xl lg:text-4xl text-left font-bold relative mb-10">
                        <img
                            src={CommunityLogo}
                            alt="logo"
                            className="w-12 h-12 lg:w-24 lg:h-24"
                        />
                        Community Box
                    </h1>

                    {/* <!-- login section --> */}
                    {formState === 'login' && (
                        <form id="login">
                            {error.show && error.form === 'login' && (
                                <Alert
                                    severity={error.type}
                                    sx={{ marginBottom: '1rem' }}
                                    onClose={() =>
                                        setError({
                                            ...error,
                                            show: false,
                                        })
                                    }
                                    open={error.show}
                                >
                                    {error.message}
                                </Alert>
                            )}

                            <h4 className="text-xl font-semibold mb-6">
                                Welcome Back
                            </h4>
                            <div className="relative mb-6">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="username/Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Username / Email"
                                />
                            </div>
                            <div className="relative mb-6">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Password"
                                />
                            </div>

                            <Button
                                sx={{
                                    backgroundColor: '#1c274c',
                                    marginBottom: '1rem',
                                }}
                                onClick={handleLogin}
                                variant="contained"
                                className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                            >
                                {loading.login ? (
                                    <Loader width={200} height={200} />
                                ) : (
                                    'Login'
                                )}
                            </Button>
                            <Link
                                onClick={handleSignWithGoogle}
                                className="flex justify-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6 border border-blue-950 "
                            >
                                <GoogleIcon
                                    fill="none"
                                    width="20"
                                    height="20"
                                />
                                <span className="ml-2 font-normal">
                                    Login with Google
                                </span>
                            </Link>
                            <div className="text-center mb-6">
                                <a
                                    href="#"
                                    id="fwdbtn"
                                    onClick={handleForgotPasswordClick}
                                    className="text-sm text-red-500 hover:text-red-700"
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            <div className="extra_on_mobile text-center">
                                <small>
                                    Dont have an acount?{' '}
                                    <a
                                        href="#"
                                        onClick={handleSignupClick}
                                        id="signupshown1"
                                        className="text-blue-600"
                                    >
                                        SignUp
                                    </a>
                                </small>
                            </div>
                        </form>
                    )}
                    {/* <!-- signup section --> */}
                    {formState === 'signup' && (
                        <form id="signup">
                            {error.show && error.form === 'signup' && (
                                <Alert
                                    severity={error.type}
                                    sx={{ marginBottom: '1rem' }}
                                    onClose={() =>
                                        setError({
                                            ...error,
                                            show: false,
                                        })
                                    }
                                    open={error.show}
                                >
                                    {error.message}
                                </Alert>
                            )}

                            <h4 className="text-xl font-semibold mb-6">
                                SignUp to continue
                            </h4>
                            <div className="relative mb-6">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    value={displayName}
                                    onChange={(e) =>
                                        setDisplayName(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Bonnie Green"
                                />
                            </div>
                            <div className="relative mb-6">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="storm@gmail.com"
                                />
                            </div>
                            <div className="relative mb-6">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="flex items-start mb-6">
                                <div className="flex items-center mb-4">
                                    <input
                                        id="checkbox-1"
                                        name="checkbox-1"
                                        onChange={() => setDisabled(!disabled)}
                                        aria-describedby="checkbox-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-800 bg-gray-100 rounded border-gray-300 focus:ring-blue-700 "
                                    />
                                    <label
                                        htmlFor="checkbox-1"
                                        className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        I agree to the{' '}
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            terms and conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <Button
                                sx={{
                                    backgroundColor: disabled
                                        ? 'gray'
                                        : '#1c274c',
                                }}
                                onClick={handleRegistration}
                                disabled={disabled}
                                variant="contained"
                                className="text-white mb-6 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                            >
                                {loading.signup ? (
                                    <Loader width={200} height={200} />
                                ) : (
                                    'SignUp'
                                )}
                            </Button>
                            <div className="extra_on_mobile text-center">
                                <small>
                                    Already have an acount?{' '}
                                    <a
                                        href="#"
                                        onClick={handleSigninClick}
                                        id="signinshown2"
                                        className="text-blue-600"
                                    >
                                        Signin
                                    </a>
                                </small>
                            </div>
                        </form>
                    )}
                    {/* <!-- forgot password section --> */}
                    {formState === 'forgotpwd' && (
                        <form id="forgotpwd">
                            {error.show && error.form === 'forgotpwd' && (
                                <Alert
                                    severity={error.type}
                                    sx={{ marginBottom: '1rem' }}
                                    onClose={() =>
                                        setError({
                                            ...error,
                                            show: false,
                                        })
                                    }
                                    open={error.show}
                                >
                                    {error.message}
                                </Alert>
                            )}

                            <h4 className="text-xl font-semibold mb-4">
                                Password Rest
                            </h4>
                            <div className="relative mb-6">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="Recoveryemail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="storm@gmail.com"
                                />
                            </div>
                            <Button
                                sx={{
                                    backgroundColor: '#1c274c',
                                    marginBottom: '1rem',
                                }}
                                onClick={handleForgotPassword}
                                variant="contained"
                                className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                            >
                                {loading.forgotpwd ? (
                                    <Loader width={200} height={200} />
                                ) : (
                                    ' Reset Password'
                                )}
                            </Button>
                            <div className="extra_on_mobile text-center">
                                <small>
                                    Dont have an acount?{' '}
                                    <a
                                        href="#"
                                        onClick={handleSignupClick}
                                        id="signupshown"
                                        className="text-blue-600"
                                    >
                                        SignUp
                                    </a>
                                </small>
                            </div>
                        </form>
                    )}
                </div>
                <div
                    id="othersec"
                    className="other_sec flex flex-col justify-center items-center"
                >
                    {/* <!-- first section --> */}
                    {formState === 'login' && (
                        <div id="it_1">
                            <div>
                                <img
                                    className="svg_img"
                                    src={Signup}
                                    alt="welcome"
                                />
                            </div>
                            <div>
                                <h2 className="text-center text-xl mb-2 mt-2 font-semibold">
                                    {" Don't have an account?"}
                                </h2>
                            </div>
                            <button
                                onClick={handleSignupClick}
                                className="acc_change mt-6 text-black w-72 p-2.5"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                    {/* <!-- fourth section --> */}
                    {formState === 'signup' && (
                        <div id="it_2">
                            <div>
                                <img
                                    className="svg_img"
                                    src={Login}
                                    alt="welcome"
                                />
                            </div>
                            <div>
                                <h2 className="text-center text-xl mb-2 mt-2 font-semibold">
                                    Already have an account?
                                </h2>
                            </div>
                            <button
                                onClick={handleSigninClick}
                                className="acc_change mt-6 text-black w-72 p-2.5"
                            >
                                Sign in
                            </button>
                        </div>
                    )}
                    {/* <!-- third sectionn --> */}
                    {formState === 'forgotpwd' && (
                        <div id="it_3">
                            <div>
                                <img
                                    className="svg_img"
                                    src={Forgotpwd}
                                    alt="welcome"
                                />
                            </div>
                            <div>
                                <h2 className="text-center text-xl mb-2 mt-2 font-semibold">
                                    {"Don't have an account?"}
                                </h2>
                            </div>
                            <button
                                onClick={handleSignupClick}
                                className="acc_change mt-6 text-black w-72 p-2.5"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Auth
