"use client"

import { useGlobalContext } from '../Context/ContextProvider';
import { fetchUser, logoutUser } from '../Redux/Slices/User.slice.js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaHome, FaCompass, FaRss, FaBell, FaBookmark, FaCog, FaComments } from 'react-icons/fa';
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
// import { cookies } from 'next/headers'

import { usePathname } from 'next/navigation'


const listClasses = "transition-all duration-300 mb-2 px-4 py-1 rounded flex items-center cursor-pointer hover:bg-lightbg dark:hover:bg-darkbg";
const listTextClass = "hidden lg:flex transition-colors  duration-300 text-2xl dark:text-light-text text-dark-text"

const linkList = [
    {
        path: "/",
        name: "Home",
        icon: <FaHome className="m-2 text-2xl" />,
    },
    {
        path: "/explore",
        name: "Explore",
        icon: <FaCompass className="m-2 text-2xl" />,
    },
    {
        path: "/feeds",
        name: "Feeds",
        icon: <FaRss className="m-2 text-2xl" />,
    },
    {
        path: "/Chats",
        name: "Chats",
        icon: <FaComments className="m-2 text-2xl" />,
    },
    {
        path: "/notification",
        name: "Notification",
        icon: <FaBell className="m-2 text-2xl" />,
    },
    {
        path: "/saved",
        name: "Saved",
        icon: <FaBookmark className="m-2 text-2xl" />,
    },
    {
        path: "/Setting",
        name: "Setting",
        icon: <FaCog className="m-2 text-2xl" />,
    },
]

function RightSideBar() {

    const dispatch = useDispatch()
    const router = useRouter();
    const pathname = usePathname()

    const { User } = useSelector((state) => ({ ...state.User }))
    const { showAuth } = useGlobalContext()

    const logouthandle = async () => {
        try {
            await dispatch(logoutUser())
            router.push({
                pathname: '/',
            })
            toast.success(`Logout Successful`, {
                position: "top-right"
            })
            await dispatch(fetchUser())
        } catch (error) {
            return
        }
    }

    return (
        <div className=" hidden sm:flex dark-shadow fixed right-0 top-[3.5rem] w-auto h-[88%] p-4 m-4 border-b bg-light-component rounded-lg dark:bg-dark-component shadow-lg">
            <ul className="list-none p-0">
                {

                    linkList && linkList.length > 0 ? (

                        linkList.map((link, i) => {
                            return (
                                <Link key={i} href={`${link.path}`} className={`${listClasses}`}>
                                    {link.icon}
                                    {
                                        pathname == "/" ?
                                            <span className={`${listTextClass}`}>{link.name}</span>
                                            : ""
                                    }
                                </Link>
                            )
                        })
                    ) : (
                        ""
                    )
                }

                {
                    showAuth ? (
                        <Link href={``} className={`${listClasses}`} onClick={logouthandle}>
                            <IoLogOutSharp className="m-2 text-2xl" />
                            {
                                pathname == "/" ?
                                    <span className={`${listTextClass}`}>Logout</span>
                                    : ""
                            }
                        </Link>
                    ) : ""
                }
            </ul>
        </div>
    );
}

export default RightSideBar;