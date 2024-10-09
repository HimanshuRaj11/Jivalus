"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { useGlobalContext } from "@/Context/ContextProvider";
import axios from "axios";
import { GrLinkNext } from "react-icons/gr";

export default function RegisterForm() {
    const { setLoginBtn, setRegisterBtn } = useGlobalContext()

    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        firstname: "",
        lastName: "",
        email: "",
        ConfirmPassword: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setLoginData((preVal) => {
            return { ...preVal, [name]: value };
        });
    };

    const [error, setError] = useState("");
    const router = useRouter();

    const checkPassword = () => {
        const check = registerData.password == registerData.ConfirmPassword
        if (check) {

            const btnTheame = "cursor-not-allowed"
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
        }

        try {
            const res = await axios.post("", { registerData })
        } catch (error) {

        }

    };

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
                        Register to LIVALUS
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                Username
                            </h3>
                            <div className="mt-2">
                                <input
                                    name="username"
                                    value={registerData.username}
                                    onChange={handleInput}
                                    className="block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                    Password
                                </h3>

                            </div>
                            <div className="mt-2">
                                <input
                                    name="password"
                                    type="password"
                                    value={registerData.password}
                                    onChange={handleInput}
                                    className="block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                    Confirm Password
                                </h3>

                            </div>
                            <div className="mt-2">
                                <input
                                    name="ConfirmPassword"
                                    type="password"
                                    value={registerData.ConfirmPassword}
                                    onChange={handleInput}
                                    className="block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {
                            error ? (
                                <div>
                                    <h3 className="text-red-600 text-sm ">{message}</h3>
                                </div>
                            ) : ""
                        }
                        <div>
                            <button
                                // onClick={handleSubmit}
                                className={` flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                Next <span className=" mx-3  justify-center dark:text-light-text text-dark-text hover:text-gray-800 flex items-center space-x-1">
                                    <GrLinkNext className="size-4 font-semibold" />
                                </span>
                            </button>
                        </div>
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