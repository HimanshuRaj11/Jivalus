
"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { IoSettings } from "react-icons/io5";
import Footer from './footer';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import axios from 'axios';
const bannerImg = "https://t3.ftcdn.net/jpg/05/35/35/38/360_F_535353834_fAKyu7nTpbpNux5XdR5T63OUJ6gDOHlD.jpg"
const personSvg = "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
function page() {
    const { User, loading } = useSelector((state) => ({ ...state.User }))
    const [posts, setPosts] = useState()

    const Followers = User?.followers
    const FollowersLength = Followers?.length

    const Followings = User?.followings
    const FollowingsLength = Followings?.length;

    const Posts = User?.posts
    const PostsLength = Posts?.length;

    const GetPosts = async () => {
        try {
            const { data: { UsersPosts } } = await axios.get("http://localhost:3000/api/user/fetchPosts")
            setPosts(UsersPosts)
        } catch (error) {
            return error

        }
    }

    useEffect(() => {
        GetPosts()
    }, [User])


    return (

        <div className=" w-[75%]" >
            {/* Profile banner or details */}

            <div className="Profile-banner">
                <div className="img banner-rounder overflow-hidden">
                    <img src={`${bannerImg}`} alt="" className="w-full h-72" />
                </div>

                <div className="profileDetails relative top-[-100px] flex">

                    <img
                        src={`${personSvg}`}
                        alt="User Avatar"
                        className="size-52 rounded-full "
                    />
                    <div className="details w-full h-52 flex flex-row relative top-[80px] pt-8 pl-10 ">

                        <div className="flex flex-col w-[35%] mx-4 ">
                            <div className="" >
                                <h1 className="text-2xl">@{User?.username}</h1>
                                <h1 className="text-2xl">{User?.firstName} {User?.lastName}</h1>
                            </div>
                            <div className="w-44 my-2 h-36 overflow-hidden">
                                <p className="text-[16px] leading-6 text-gray-500"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero explicabo perferendis commodi consequuntur alias sed itaque neque porro sunt rerum.</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-around items-center w-[56%] ">

                            <div className="flex justify-around w-full mx-4 items-center">
                                <Link href={`${User?.username}/edit`} className="font-semibold">Edit Profile</Link>
                                <Button className="font-semibold">Insights</Button>
                                <span className="font-semibold"><IoSettings className="size-9 cursor-pointer text-dark-text dark:text-light-text " /></span>
                            </div>

                            <div className="flex justify-around w-full mx-4 items-center">
                                <div className="flex flex-col p-2 justify-center items-center">
                                    <h2 className="text-lg font-semibold items-center" >{FollowingsLength}</h2>
                                    <h2 className="text-md text-gray-400">Followings</h2>
                                </div>

                                <div className="v-line h-8 w-[1px]  bg-darkbg dark:bg-lightbg"></div>

                                <div className="flex flex-col p-2 justify-center items-center">
                                    <h2 className="text-lg font-semibold items-center" >{FollowersLength}</h2>
                                    <h2 className="text-md text-gray-400">Followers</h2>
                                </div>
                                <div className="v-line h-8 w-[1px]  bg-darkbg dark:bg-lightbg"></div>

                                <div className="flex flex-col p-2 justify-center items-center">
                                    <h2 className="text-lg font-semibold items-center" >{PostsLength}</h2>
                                    <h2 className="text-md text-gray-400">Posts</h2>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="line-h bg-darkbg dark:bg-lightbg w-full h-[1px]"></div>

            </div>

            {/* Posts  */}
            <div className="w-full my-4">
                <div className="flex justify-center w-full my-4">
                    <div className="">
                        <h1 className="text-2xl font-semibold">POSTS</h1>
                        <div className="line-h bg-darkbg dark:bg-lightbg w-full h-[1px]"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {
                        posts && posts?.length > 0 ? (

                            posts.map((post, index) => {
                                const files = post?.file

                                const comments = post?.comments
                                const commentsLength = comments?.length

                                const likes = post?.likes
                                const likesLength = likes?.length

                                return (
                                    <div key={index} className="bg-light-component cursor-pointer p-2 flex flex-col items-center justify-between dark:bg-dark-component shadow-md my-2 rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">

                                        <img src={files[0]} alt={''} className="w-[96%] h-[17rem] object-contain rounded-lg" />


                                        <div className="flex justify-between mt-2 w-full">
                                            <span className="text-gray-500 text-sm">Likes: {likesLength}</span>
                                            <span className="text-gray-500 text-sm">Comments: {commentsLength}</span>
                                            <span className="text-gray-500 text-sm">Shares: {0}</span>
                                        </div>

                                    </div>
                                )
                            }
                            )

                        ) : ""
                    }

                </div>
            </div>

            {/* Footer for Profile Page */}
            <Footer />
        </div>
    )
}

export default page
