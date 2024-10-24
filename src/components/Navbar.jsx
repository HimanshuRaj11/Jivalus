"use client"
// components/Navbar.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHome, FaBell, FaUserCircle, FaComments, FaCog } from 'react-icons/fa';
import { BiLogInCircle } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { ModeToggle } from './ui/ModelToggle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "../Redux/Slices/User.slice.js"
import CreatePost from './create-post';
import Login from './Login';
import PageLoader from './pageLoader';
import { useGlobalContext } from '../Context/ContextProvider';
import RegisterForm from './Register';
import { userSuggested } from '../Redux/Slices/SuggestedUser';
import { GetPosts } from '../Redux/Slices/PostsSlice';
const profileSvg = 'https://www.svgrepo.com/show/327465/person-circle.svg'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
    const { showAuth, setShowAuth, createPostbtn, setCreatePostBtn, Loginbtn, setLoginBtn, Registerbtn, setRegisterBtn } = useGlobalContext()

    const dispatch = useDispatch();

    const { User, loading } = useSelector((state) => ({ ...state.User }))


    if (typeof window !== "undefined") {
        document.body.style.overflow = (pathname == "/Chats") || createPostbtn || Loginbtn || Registerbtn ? "hidden" : "auto";
    }
    useEffect(() => {
        if (User?.username) {
            setShowAuth(true)
        } else {
            setShowAuth(false)
        }
    }, [User])

    useEffect(() => {
        dispatch(fetchUser())
        dispatch(userSuggested())
        dispatch(GetPosts())
    }, [])
    useEffect(() => {
        dispatch(GetPosts())
    }, [])
    return (
        <>
            <nav className="dark-shadow w-full rounded-lg sticky top-0 z-10 backdrop-blur bg-background/50 bg-light-component dark:bg-dark-component">
                < div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                    <div className="flex justify-between h-16">

                        <div className="flex ">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold dark:text-light-text text-dark-text">JIVALUS</Link>
                            </div>

                            <div className="hidden md:flex md:items-center md:space-x-4 md:ml-32">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="md:w-96 px-3 py-2 border bg-lightbg dark:bg-darkbg rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="hidden md:flex md:items-center md:space-x-4 ml-5">
                            {
                                showAuth ? (
                                    <div className="flex justify-around w-32 ">
                                        <span onClick={() => (setCreatePostBtn(true))} className=" dark:text-light-text text-dark-text cursor-pointer hover:text-gray-800 flex items-center space-x-1">
                                            <FiPlusCircle className="size-8" />
                                        </span>
                                        <Link href={`${User?.username}`} className=" dark:text-light-text text-dark-text hover:text-gray-800 flex items-center space-x-1">
                                            <img className="w-10 h-10 rounded-full" src={User?.profilePic?.file ? User?.profilePic?.file : profileSvg} alt={""} />
                                        </Link>
                                    </div>
                                ) : (
                                    <span onClick={() => (setLoginBtn(!Loginbtn), setRegisterBtn(false))} className="cursor-pointer dark:text-light-text text-dark-text hover:text-gray-800 flex items-center space-x-1"><BiLogInCircle className="size-8" /></span>
                                )
                            }

                        </div>
                        <div className=" flex items-center">
                            <ModeToggle className="" />
                        </div>

                    </div>
                </div >

                {/* Mobile menu, show/hide based on menu state. */}
                < div className="hidden" id="mobile-menu" >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                            <FaHome className="size-8" />
                            <span>Home</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                            <FaBell className="size-8" />
                            <span>Notification</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                            <FaUserCircle className="size-8" />
                            <span>Profile</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                            <FaComments className="size-8" />
                            <span>Chats</span>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                            <FaCog className="size-8" />
                            <span>Settings</span>
                        </a>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div >


            </nav >
            {
                createPostbtn ? <CreatePost /> : ""
            }
            {
                Loginbtn ? <Login /> : ""
            }
            {
                Registerbtn ? <RegisterForm /> : ""
            }

        </>

    );
};

export default Navbar;