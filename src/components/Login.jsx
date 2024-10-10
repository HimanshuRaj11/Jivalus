"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/Redux/Slices/User.slice.js";
import { ImCross } from "react-icons/im";
import { useGlobalContext } from "@/Context/ContextProvider";


function Login() {

  const { setLoginBtn, Registerbtn, setRegisterBtn } = useGlobalContext()

  const dispatch = useDispatch();
  const { push } = useRouter();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginData;
  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData((preVal) => {
      return { ...preVal, [name]: value };
    });
  };

  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://localhost:3000/api/user/login", { loginData }, { withCredentials: true })
        .then(async ({ data, status }) => {
          if (data.success) {
            toast.success(`${data.message}`, {
              position: "top-right"
            });
            await dispatch(fetchUser())
            push('/')
            setLoginBtn(false)
          }
          setLoginData({
            username: "",
            password: "",
          });
          setMessage(null)
          setError(false)

        }).catch(({ response: { data }, status }) => {
          setMessage("**" + data.message)
          setError(data.error)
        })
    } catch (error) {
      return
    }

  };

  return (
    <div className="z-10 fixed top-[4rem] backdrop-blur-lg w-full min-h-screen flex justify-center items-center">
      <span className="fixed cursor-pointer top-8 right-20" onClick={() => (setLoginBtn(false))}>
        <ImCross className="dark:text-light-text text-dark-text text-2xl" />
      </span>
      <div className="dark-shadow relative -top-3 rounded-md flex h-[70vh] flex-col justify-center px-6 py-12 lg:px-8 w-[80%] md:w-[50%] bg-light-component dark:bg-dark-component ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dark-text dark:text-light-text">
            Login to your account
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
                  value={loginData.username}
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
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  value={loginData.password}
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
                onClick={handleSubmit}
                className={` flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Login
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not have an account?
            <span onClick={() => (setRegisterBtn(true), setLoginBtn(false))}
              className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mx-2">
              Create an Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
