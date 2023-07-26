import React, { useState, useEffect } from 'react'
import '../../assets/styles/main.scss'
import Signup from '../../assets/images/signup.svg'
import Login from '../../assets/images/login.svg'
import Forgotpwd from '../../assets/images/forgotpwd.svg'
import { Link } from 'react-router-dom'

const Auth = () => {
    const [formState, setFormState] = useState('login')
    const [isMobile, setIsMobile] = useState(false)

    const handleSignupClick = () => {
        setFormState('signup')
        document.getElementById('color1').classList.add('change1')
        document.getElementById('color2').classList.add('change2')
        document.getElementById('othersec').classList.add('change3')
        document.getElementById('formcard').classList.add('change4')
    }

    const handleSigninClick = () => {
        setFormState('login')
        document.getElementById('color1').classList.remove('change1')
        document.getElementById('color2').classList.remove('change2')
        document.getElementById('othersec').classList.remove('change3')
        document.getElementById('formcard').classList.remove('change4')
    }

    const handleForgotPasswordClick = () => {
        setFormState('forgotpwd')
        document.getElementById('color1').classList.add('change1')
        document.getElementById('color2').classList.add('change2')
        document.getElementById('othersec').classList.add('change3')
        document.getElementById('formcard').classList.add('change4')
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <>
            <div className="con_colors">
                <div id="color1"></div>
                <div id="color2"></div>
            </div>
            <div className="auth_card" id="authCard">
                <div
                    id="formcard"
                    className="form_card flex flex-col justify-center"
                >
                    <h1
                        className={`text-center font-bold ${
                            isMobile ? 'text-lg' : 'text-5xl'
                        } relative mb-10`}
                    >
                        Community Box
                    </h1>
                    {/* <!-- login section --> */}
                    {formState === 'login' && (
                        <form action="#" id="login">
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
                                    id=""
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
                                    id=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            {/* <!-- link to open the home page --> */}
                            <Link
                                to={'/community_box'}
                                type="submit"
                                id="submit_btn"
                                className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
                            >
                                Login
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
                        <form action="#" id="signup">
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
                                    id=""
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
                                    type="text"
                                    id=""
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
                                    id=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="flex items-start mb-6">
                                <div className="flex items-center mb-4">
                                    <input
                                        id="checkbox-1"
                                        aria-describedby="checkbox-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
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
                            <Link
                                to={'/community_box'}
                                type="submit"
                                id="submit_btn"
                                className="text-white mb-6 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                            >
                                SignUp
                            </Link>
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
                        <form action="#" id="forgotpwd">
                            <h4 className="text-xl font-semibold mb-4">
                                Password Rest
                            </h4>
                            <h6 className="text-sm mb-6">
                                A rest email will be sent to your email address!
                            </h6>
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
                                    type="text"
                                    id=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="storm@gmail.com"
                                />
                            </div>

                            <button
                                type="submit"
                                id="submit_btn_fwd"
                                className="text-white mb-6 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                            >
                                Reset Password
                            </button>
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
