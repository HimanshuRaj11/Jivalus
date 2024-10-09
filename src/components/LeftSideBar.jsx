// components/LeftSideBar.js

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
const bannerImg = "https://t3.ftcdn.net/jpg/05/35/35/38/360_F_535353834_fAKyu7nTpbpNux5XdR5T63OUJ6gDOHlD.jpg"
const personSvg = "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"


const scrollBarStyle = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`

const listStyle = "flex items-center justify-between bg-lightbg rounded-lg dark:bg-darkbg p-3 my-2"
const LeftSideBar = () => {
    const { User, loading } = useSelector((state) => ({ ...state.User }))
    const UserFullName = User?.firstName + " " + User?.lastName

    return (
        <div className="hidden lg:flex flex-col fixed rounded-lg left-0 top-16 h-full w-[22%] overflow-y-auto">
            {/* User Profile Card */}
            <div className="dark-shadow p-4 mx-4 my-1 border-b h-auto bg-light-component rounded-lg dark:bg-dark-component">
                <div className="banner h-auto">
                    <img src={`${bannerImg}`} alt="" className="w-full rounded-sm object-fill h-20" />
                </div>
                <div className="flex items-center justify-center space-x-4 ">
                    <img
                        src={`${personSvg}`}
                        alt="User Avatar"
                        className="size-16 rounded-full relative top-[-34px]"
                    />
                </div>
                <div className="flex justify-center -mt-8 flex-col items-center mb-2" >
                    <h2 className="text-lg font-semibold">{UserFullName} </h2>
                    <p className="text-md text-gray-400">@{User?.username}</p>
                </div>
                <div className="line-h bg-darkbg dark:bg-lightbg w-full h-[1px]"></div>
                <div className="flex justify-around items-center">
                    <div className="flex flex-col p-2 justify-center items-center">
                        <h2 className="text-lg font-semibold items-center" >1454</h2>
                        <h2 className="text-md text-gray-400">Followers</h2>
                    </div>

                    <div className="v-line h-8 w-[1px]  bg-darkbg dark:bg-lightbg"></div>

                    <div className="flex flex-col p-2 justify-center items-center">
                        <h2 className="text-lg font-semibold items-center" >1454</h2>
                        <h2 className="text-md text-gray-400">Followings</h2>
                    </div>
                </div>
                <div className="line-h bg-darkbg dark:bg-lightbg w-full h-[1px]"></div>
                <div className="btn flex justify-center mt-2">
                    <Link href="/profile">
                        <Button varient="outline" className="text-lg dark:text-white text-black font-semibold p-2 bg-blue-500 hover:bg-blue-600">My Profile</Button>
                    </Link>
                </div>
            </div>

            {/* Suggestions Card */}
            <div className="dark-shadow overflow-hidden py-2 px-4 mx-4 mt-4 border-b h-[20rem] bg-light-component rounded-lg dark:bg-dark-component ">
                <h3 className="text-lg font-semibold mb-2">You might Know</h3>

                <div className="line-h bg-darkbg dark:bg-lightbg w-full h-[1px]"></div>

                <ul className={`space-y-3 pe-2 mt-2 overflow-y-scroll h-[16.8rem] ${scrollBarStyle}`}>

                    <li className={`${listStyle}`}>
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h4 className="text-sm font-semibold">Jane Smith</h4>
                                <p className="text-xs text-gray-600">@janesmith</p>
                            </div>
                        </div>
                        <button className="text-blue-500 text-sm font-semibold">Follow</button>
                    </li>

                    <li className={`${listStyle}`}>
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h4 className="text-sm font-semibold">Jane Smith</h4>
                                <p className="text-xs text-gray-600">@janesmith</p>
                            </div>
                        </div>
                        <button className="text-blue-500 text-sm font-semibold">Follow</button>
                    </li>

                    <li className={`${listStyle}`}>
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h4 className="text-sm font-semibold">Jane Smith</h4>
                                <p className="text-xs text-gray-600">@janesmith</p>
                            </div>
                        </div>
                        <button className="text-blue-500 text-sm font-semibold">Follow</button>
                    </li>
                    <li className={`${listStyle}`}>
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h4 className="text-sm font-semibold">Jane Smith</h4>
                                <p className="text-xs text-gray-600">@janesmith</p>
                            </div>
                        </div>
                        <button className="text-blue-500 text-sm font-semibold">Follow</button>
                    </li>
                    <li className={`${listStyle}`}>
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h4 className="text-sm font-semibold">Jane Smith</h4>
                                <p className="text-xs text-gray-600">@janesmith</p>
                            </div>
                        </div>
                        <button className="text-blue-500 text-sm font-semibold">Follow</button>
                    </li>



                    {/* Add more suggestions as needed */}
                </ul>
            </div>
        </div>
    );
};

export default LeftSideBar;