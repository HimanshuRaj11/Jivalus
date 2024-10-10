"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { useGlobalContext } from "@/Context/ContextProvider";
import axios from "axios";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { fetchUser } from "@/Redux/Slices/User.slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const InputerrorStyle = 'border-solid border-2 border-red-700 focus:border-red-700';
const InputSuccessStyle = 'border-solid border-2 border-green-700 '
const InputStyle = ' block w-full outline-none rounded-md p-1.5 text-dark-text dark:text-light-text shadow-sm ring-1  placeholder:text-gray-400 sm:text-sm sm:leading-6'




export default function RegisterForm() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const { setLoginBtn, setRegisterBtn } = useGlobalContext()

    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        ConfirmPassword: ""
    });
    const { username, password, firstName, lastName, email, ConfirmPassword } = registerData


    const [error, setError] = useState("");
    const router = useRouter();
    const [usernameField, setUsernameField] = useState(null)
    const [PasswordField, setPasswordField] = useState(null)
    const [ConfirmPasswordField, setConfirmPasswordField] = useState(null)

    const [IconShow, setIconShow] = useState({
        username: false,
        password: false,
        ConfirmPassword: false
    })

    const [nextFildes, setNextFields] = useState(true)

    const checkdetail = async () => {
        const regexUsername = /^[a-zA-Z0-9._]+$/;

        const { data } = await axios.post("http://localhost:3000/api/user/username", { username: registerData.username }, { withCredentials: true })
        const checkLength = registerData.username.length >= 5
        const regexUsernameTest = regexUsername.test(registerData.username);

        // if (registerData.username.length >= 1) {
        //     setIconShow({ username: true })
        // } else {
        //     setIconShow({ username: false })
        // }
        // if (registerData.password.length >= 1) {
        //     setIconShow({ password: true })
        // } else {
        //     setIconShow({ password: false })
        // }
        // if (registerData.ConfirmPassword.length >= 1) {
        //     setIconShow({ ConfirmPassword: true })
        // } else {
        //     setIconShow({ ConfirmPassword: false })
        // }

        if (checkLength && data.success && regexUsernameTest) {
            setUsernameField(true)
        } else {
            setUsernameField(false)
        }

        const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        // Check Password validation
        const regexPasswordTest = regexPassword.test(registerData.password)
        if (regexPasswordTest) {
            setPasswordField(true)
        } else {
            setPasswordField(false)
        }

        // check Confirm Password match or not
        const checkPassword = registerData.password == registerData.ConfirmPassword && registerData.password.length >= 8
        if (checkPassword) {
            setConfirmPasswordField(true)
        } else {
            setConfirmPasswordField(false)
        }

        const btnTheame = "cursor-not-allowed"
    }
    const handleNext = () => {
        // const checkPassword = (password == ConfirmPassword)
        // if (checkPassword) {
        //     setConfirmPasswordField(true)
        // } else {
        //     setConfirmPasswordField(false)
        // }
        setNextFields(false)
    }
    const handlePrev = () => {
        setNextFields(true)
    }


    const handleInput = (e) => {
        const { name, value } = e.target;
        setRegisterData((preVal) => {
            return { ...preVal, [name]: value };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password || !username) {
            setError("All fields are necessary.");
            return;
        }
        try {
            await axios.post("http://localhost:3000/api/user/register", { registerData })
                .then(async ({ data }) => {
                    console.log(data);
                    setRegisterBtn(false)
                    push('/')
                    toast.success(`${data.message}`, {
                        position: "top-right"
                    });
                    await dispatch(fetchUser())
                }).catch((error) => {
                    console.log(error);
                    return;
                })
            // console.log(res.data);
        } catch (error) {
            console.log(error.message);
            return error.message;

        }

    };

    useEffect(() => {
        // checkdetail()
    }, [handleInput])


    return (
        <div className="z-10 fixed top-[4rem] backdrop-blur-lg w-full min-h-screen flex justify-center items-center">
            <span className="fixed cursor-pointer top-8 right-20" onClick={() => (setRegisterBtn(false))}>
                <ImCross className="dark:text-light-text text-dark-text text-2xl" />
            </span>
            <div className="dark-shadow relative -top-3 rounded-md flex h-[70vh] flex-col justify-center px-6 py-8 lg:px-8 w-[80%] md:w-[50%] bg-light-component dark:bg-dark-component ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-dark-text dark:text-light-text">
                        Register to JIVALUS
                    </h2>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        {/* First filds */}
                        {
                            nextFildes ? (
                                <>
                                    <div>
                                        <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                            Username
                                        </h3>
                                        <div className="mt-2 relative">
                                            <input
                                                name="username"
                                                value={registerData.username}
                                                onChange={handleInput}
                                                className={`${InputStyle}`}
                                            />
                                            {
                                                IconShow.username ? (usernameField ? (<FaCircleCheck className="absolute top-[9px]  -right-7 size-5 font-semibold text-green-700" />) : (
                                                    <MdCancel className="absolute top-[9px]  -right-7 size-5 font-semibold text-red-700" />
                                                )
                                                ) : ""
                                            }


                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                Password
                                            </h3>

                                        </div>
                                        <div className="mt-2 relative">
                                            <input
                                                name="password"
                                                type="password"
                                                value={registerData.password}
                                                onChange={handleInput}
                                                className={`${InputStyle} `}
                                            />
                                            {
                                                IconShow.password ? (PasswordField ? (<FaCircleCheck className="absolute top-[9px]  -right-7 size-5 font-semibold text-green-700" />) : (
                                                    <MdCancel className="absolute top-[9px]  -right-7 size-5 font-semibold text-red-700" />
                                                )) : ""
                                            }


                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                Confirm Password
                                            </h3>

                                        </div>
                                        <div className="mt-2 relative">
                                            <input
                                                name="ConfirmPassword"
                                                type="password"
                                                value={registerData.ConfirmPassword}
                                                onChange={handleInput}
                                                className={`${InputStyle}`}
                                            />
                                            {
                                                IconShow.ConfirmPassword ? (ConfirmPasswordField ? (<FaCircleCheck className="absolute top-[9px]  -right-7 size-5 font-semibold text-green-700" />) : (
                                                    <MdCancel className="absolute top-[9px] -right-7 size-5 font-semibold text-red-700" />
                                                )) : ""
                                            }
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                            First name
                                        </h3>
                                        <div className="mt-2">
                                            <input
                                                name="firstName"
                                                value={registerData.firstName}
                                                onChange={handleInput}
                                                className={`${InputStyle}`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                Last Name
                                            </h3>

                                        </div>
                                        <div className="mt-2">
                                            <input
                                                name="lastName"
                                                value={registerData.lastName}
                                                onChange={handleInput}
                                                className={`${InputStyle}`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                                Email
                                            </h3>

                                        </div>
                                        <div className="mt-2">
                                            <input
                                                name="email"
                                                type="email"
                                                value={registerData.email}
                                                onChange={handleInput}
                                                className={`${InputStyle}`}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {/* Second filds */}

                        {
                            error ? (
                                <div>
                                    <h3 className="text-red-600 text-sm ">{message}</h3>
                                </div>
                            ) : ""
                        }
                        {
                            nextFildes ? (
                                <div>
                                    <button
                                        onClick={handleNext}
                                        className={` flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        Next <span className=" mx-3  justify-center dark:text-light-text text-dark-text hover:text-gray-800 flex items-center space-x-1">
                                            <GrLinkNext className="size-4 font-semibold" />
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between">
                                    <button
                                        onClick={handlePrev}
                                        className={` flex w-[48%] items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                                        <span className=" mx-3  justify-center dark:text-light-text text-dark-text hover:text-gray-800 flex items-center space-x-1">
                                            <GrLinkPrevious className="size-4 font-semibold" />
                                        </span> Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className={` flex w-[48%] items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                                        Submit <span className=" mx-3  justify-center dark:text-light-text text-dark-text hover:text-gray-800 flex items-center space-x-1">
                                            {/* <GrLinkNext className="size-4 font-semibold" /> */}
                                        </span>
                                    </button>
                                </div>
                            )
                        }



                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account!
                        <span onClick={() => (setRegisterBtn(false), setLoginBtn(true))}
                            className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mx-2"
                        >
                            Login to account
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
}