"use client"
// components/LeftSideBar.js

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useGlobalContext } from '../Context/ContextProvider';
import UserProfileInfo from './userProfileInfo';
import { selectProcessedSuggestedUsers, selectProcessedUsers } from '../Redux/selector';

const bannerImg = "https://t3.ftcdn.net/jpg/05/35/35/38/360_F_535353834_fAKyu7nTpbpNux5XdR5T63OUJ6gDOHlD.jpg"
const addvertisementImg = "https://indianmediastudies.com/wp-content/uploads/2023/11/what-is-advertising-copy.jpeg.webp"
const profileSvg = 'https://www.svgrepo.com/show/327465/person-circle.svg'
const scrollBarStyle = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`

const listStyle = "flex items-center justify-between bg-lightbg rounded-lg dark:bg-darkbg p-1 my-2"


const LeftSideBar = () => {
    const { showAuth } = useGlobalContext()
    const { User, loading } = useSelector(selectProcessedUsers)
    const { suggestedUsers } = useSelector(selectProcessedSuggestedUsers)

    const UserFullName = User?.firstName + " " + User?.lastName
    const followings = User?.followings

    const Followers = User?.followers
    const FollowersLength = Followers?.length

    const Followings = User?.followings
    const FollowingsLength = Followings?.length;

    const Posts = User?.posts
    const PostsLength = Posts?.length;


    return (
        <div className="hidden lg:flex m-4 flex-col fixed rounded-lg left-0 top-[3.5rem] h-full w-[22%] overflow-y-auto">
            {/* User Profile Card */}
            <div className="dark-shadow p-4 mx-4 my-1 border-b h-auto bg-light-component rounded-lg dark:bg-dark-component">
                {
                    showAuth ? (
                        <div>
                            <div className="banner h-auto">
                                <img src={`${bannerImg}`} alt="" className="w-full rounded-sm object-fill h-20" />
                            </div>
                            <div className="flex items-center justify-center space-x-4 ">
                                <img
                                    src={User?.profilePic?.file ? User?.profilePic?.file : profileSvg}
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
                                    <h2 className="text-lg font-semibold items-center" >{FollowersLength}</h2>
                                    <h2 className="text-md text-gray-400">Followers</h2>
                                </div>

                                <div className="v-line h-8 w-[1px]  bg-darkbg dark:bg-lightbg"></div>

                                <div className="flex flex-col p-2 justify-center items-center">
                                    <h2 className="text-lg font-semibold items-center" >{FollowingsLength}</h2>
                                    <h2 className="text-md text-gray-400">Followings</h2>
                                </div>
                            </div>
                            <div className="line-h bg-darkbg dark:bg-lightbg w-full h-[1px]"></div>
                            <div className="btn flex justify-center mt-2">
                                <Link href={`${User?.username}`}>
                                    <Button varient="outline" className="text-lg dark:text-white text-black font-semibold p-2 bg-blue-600 hover:bg-blue-500">My Profile</Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="w-[17rem] h-[17rem]">
                            <img src={`${addvertisementImg}`} alt="" className="w-full h-full object-fill rounded-lg" />
                        </div>
                    )
                }
            </div>

            {/* Suggestions Card */}
            <div className="dark-shadow overflow-hidden py-2 px-4 mx-4 mt-4 border-b h-[20rem] bg-light-component rounded-lg dark:bg-dark-component ">
                <h3 className="text-lg font-semibold mb-2">You might Know</h3>

                <div className="line-h bg-darkbg dark:bg-lightbg w-full h-[1px]"></div>

                <ul className={`space-y-3 pe-2 mt-2 overflow-y-scroll h-[16.8rem] ${scrollBarStyle}`}>
                    {suggestedUsers && suggestedUsers.length > 0 ? (
                        suggestedUsers.map((userDetails, i) => {
                            const isFollowing = followings?.includes(userDetails?._id) || (User?._id == userDetails?._id)

                            const userDetail = {
                                profilePic: userDetails?.profilePic,
                                isFollowing,
                                _id: userDetails?._id,
                                username: userDetails?.username,
                                firstName: userDetails?.firstName,
                                lastName: userDetails?.lastName
                            }
                            return (
                                <li className={`${listStyle} text-sm`} key={i + 1}>
                                    <UserProfileInfo userDetails={userDetail} />
                                </li>
                            )

                        })
                    ) : ("")}

                </ul>
            </div>
        </div>
    );
};

export default LeftSideBar;