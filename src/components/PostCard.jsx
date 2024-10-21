"use client"


import { useGlobalContext } from '@/Context/ContextProvider';
import axios from 'axios';
import { comment } from 'postcss';
// import { selectPosts } from '@/Redux/Slices/PostsSlice';
import React, { useEffect, useState } from 'react';
import { FaEllipsisH, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const profileSvg = 'https://www.svgrepo.com/show/327465/person-circle.svg'

function PostCard() {
    const { setLoginBtn } = useGlobalContext()
    const { User } = useSelector((state) => ({ ...state.User }))
    const { Posts } = useSelector((state) => state.Posts);
    const followings = User?.followings


    const follow = async () => {
        try {
            if (!User) {
                setLoginBtn(true)
            }
            await axios.post("http://localhost:3000/api/user/follow")
        } catch (error) {
            return error
        }
    }
    const like = async (_id) => {
        try {
            if (!User) {
                setLoginBtn(true)
            }

            const res = await axios.post(`http://localhost:3000/api/post/${_id}/like`)
            console.log(res);

        } catch (error) {
            console.log(error);

            return error
        }
    }
    const comment = async ({ _id }) => {
        try {
            if (!User) {
                setLoginBtn(true)
            }
            // check 
            // await axios.post(`http://localhost:3000/api/post/${_id}/comment)
        } catch (error) {
            console.log(error);
            return error
        }
    }


    return (

        <div>
            {Posts && Posts.length > 0 ? (
                Posts.map((post, index) => {
                    const PostDetail = post?.post
                    const PostFile = PostDetail?.file
                    const userDetails = post?.userDetails
                    const isFollowing = followings?.includes(userDetails._id) || (User?._id == userDetails?._id)
                    const isliked = PostDetail?.likes?.includes(User?._id)


                    return (
                        <div key={index + 1} className="dark-shadow mx-auto rounded-lg  bg-light-component  dark:bg-dark-component shadow-lg overflow-hidden mt-2 mb-4">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center">
                                    <img className="w-10 h-10 rounded-full" src={userDetails?.profilePic ? userDetails?.profilePic : profileSvg} alt={""} />
                                    <div className="ml-3">
                                        <span className='flex flex-row '>
                                            <p className="dark:text-light-text text-dark-text font-semibold">{userDetails?.firstName + " " + userDetails?.lastName}</p>
                                            {
                                                isFollowing ? "" : <span onClick={follow} className="mx-5 text-blue-600 font-semibold cursor-pointer">Follow</span>
                                            }

                                        </span>
                                        <p className="text-gray-600 text-sm">@ {userDetails?.username}</p>
                                    </div>
                                </div>
                                <FaEllipsisH className="text-gray-600 cursor-pointer" />
                            </div>
                            <div className="px-4">
                                <p className="text-gray-700 text-sm">2 hours ago</p>
                            </div>
                            <div className="px-4 py-2">
                                <p className="dark:text-light-text text-dark-text">{PostDetail?.discription}</p>
                            </div>
                            {
                                PostFile?.map((file, i) => {
                                    return (
                                        <div key={i} className="p-4 flex justify-center">
                                            <img className="w-[100%] max-h-[30rem] object-contain rounded-lg" src={file} alt="Post" />
                                        </div>
                                    )
                                })
                            }

                            <div className="flex items-center justify-between px-4 py-2">
                                <div className="flex items-center space-x-4">
                                    {
                                        isliked ? (
                                            <button onClick={() => like(PostDetail?._id)} className="flex items-center cursor-pointer text-red-500">
                                                <FaHeart className="mr-1" />
                                                <span>{post?.likes}</span>
                                            </button>
                                        ) : (
                                            <button onClick={() => like(PostDetail?._id)} className="flex items-center cursor-pointer text-gray-600 hover:text-red-500">
                                                <FaHeart className="mr-1" />
                                                <span>{post?.likes}</span>
                                            </button>
                                        )
                                    }


                                    <button onClick={comment} className="flex items-center text-gray-600 hover:text-blue-500">
                                        <FaComment className="mr-1" />
                                        <span>{post?.commentLength}</span>
                                    </button>
                                    <button className="flex items-center text-gray-600 hover:text-green-500">
                                        <FaShare className="mr-1" />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p>No posts available</p>
            )}
        </div>


    );
}

export default PostCard;