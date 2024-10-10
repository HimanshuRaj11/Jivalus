"use client"

import { useGlobalContext } from '@/Context/ContextProvider';
import { fetchUser, logoutUser } from '@/Redux/Slices/User.slice.js';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaHome, FaCompass, FaRss, FaBell, FaBookmark, FaCog, FaComments } from 'react-icons/fa';
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
// import { cookies } from 'next/headers'

const listClasses = "mb-2 px-4 py-1 rounded flex items-center cursor-pointer hover:bg-lightbg dark:hover:bg-darkbg";
const listTextClass = "transition-colors duration-300 text-2xl dark:text-light-text text-dark-text"

function RightSideBar() {
    const { push } = useRouter();
    const { User } = useSelector((state) => ({ ...state.User }))
    const dispatch = useDispatch()
    const { showAuth } = useGlobalContext()

    const logouthandle = async () => {
        try {
            await dispatch(logoutUser())
            toast.success(`Logout Successful`, {
                position: "top-right"
            })
            push('/')
            await dispatch(fetchUser())
        } catch (error) {
            return
        }
    }

    return (
        <div className="dark-shadow hidden lg:flex fixed right-0 top-[3.5rem] w-[22%] h-[88%] p-4 m-4 border-b bg-light-component rounded-lg dark:bg-dark-component shadow-lg">
            <ul className="list-none p-0">
                <li className={`${listClasses}`}>
                    <FaHome className="mr-3 text-2xl" />
                    <span className={`${listTextClass}`}>Home</span>
                </li>
                <li className={`${listClasses}`}>
                    <FaCompass className="mr-3 text-2xl" />
                    <span className={`${listTextClass}`}>Explore</span>
                </li>
                <li className={`${listClasses}`}>
                    <FaRss className="mr-3 text-2xl" />
                    <span className={`${listTextClass}`}>Feeds</span>
                </li>
                <li className={`${listClasses}`}>
                    <FaComments className="mr-3 text-2xl" />
                    <span className={`${listTextClass}`}>Chats</span>
                </li>
                <li className={`${listClasses}`}>
                    <FaBell className="mr-3 text-2xl" />
                    <span className={`${listTextClass}`}>Notification</span>
                </li>
                <li className={`${listClasses}`}>
                    <FaBookmark className="mr-3 text-2xl" />
                    <span className={`${listTextClass}`}>Saved</span>
                </li>
                <li className={`${listClasses}`}>
                    <FaCog className="mr-3 text-2xl" />
                    <span className={`${listTextClass}`}>Setting</span>
                </li>
                {
                    showAuth ? (
                        <li className={`${listClasses}`} onClick={logouthandle}>
                            <IoLogOutSharp className="mr-3 text-2xl" />
                            <span className={`${listTextClass}`}>Logout</span>
                        </li>
                    ) : ""
                }
            </ul>
        </div>
    );
}

export default RightSideBar;