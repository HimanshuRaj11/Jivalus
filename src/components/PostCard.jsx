"use client"


import { useGlobalContext } from '@/Context/ContextProvider';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEllipsisH, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import PostCardSkeleton from './Skeleton/PostCard';
import { BsSendFill } from "react-icons/bs";
const profileSvg = 'https://www.svgrepo.com/show/327465/person-circle.svg'

function PostCard() {
    const { setLoginBtn } = useGlobalContext()
    const { User } = useSelector((state) => ({ ...state.User }))
    const { Posts } = useSelector((state) => state.Posts);
    const followings = User?.followings
    const [CommentInput, setCommentInput] = useState(null)
    const [comment, setComment] = useState("")


    const follow = async (_id) => {
        try {
            if (!User) {
                setLoginBtn(true)
            }
            await axios.post("http://localhost:3000/api/user/follow", { _id })
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
        } catch (error) {
            return error
        }
    }

    const commentBtn = async (Post_id) => {
        if (!User) {
            setLoginBtn(true)
        } else {
            setCommentInput(Post_id)
        }

    }
    const handleCommentInput = (e) => {
        const { name, value } = e.target
        setComment(value)
    }
    const postComment = async (_id) => {
        try {
            const res = await axios.post(`http://localhost:3000/api/comment/${_id}`, { comment })
            console.log(res);

            setComment("")
            setCommentInput(null)
        } catch (error) {
            console.log(error);

        }
        console.log(comment, _id);

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
                                    <img className="w-10 h-10 rounded-full" src={userDetails?.profilePic?.file ? userDetails?.profilePic?.file : profileSvg} alt={""} />
                                    <div className="ml-3">
                                        <span className='flex flex-row '>
                                            <Link href={`http://localhost:3000/${userDetails?.username}`} className="dark:text-light-text text-dark-text font-semibold">{userDetails?.firstName + " " + userDetails?.lastName}</Link>
                                            {
                                                isFollowing ? "" : <span onClick={() => follow(userDetails?._id)} className="mx-5 text-blue-600 font-semibold cursor-pointer">Follow</span>
                                            }

                                        </span>
                                        <Link href={`http://localhost:3000/${userDetails?.username}`} className="text-gray-600 text-sm">@ {userDetails?.username}</Link>
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

                            <div className="flex items-center w-full justify-between px-4 py-2">
                                <div className="flex items-center w-full justify-between space-x-4">
                                    {
                                        isliked ? (
                                            <button onClick={() => like(PostDetail?._id)} className="flex items-center cursor-pointer text-red-500 mx-2">
                                                <FaHeart className="mr-1 size-8" />
                                                <span className='text-2xl mx-2'>{post?.likes}</span>
                                            </button>
                                        ) : (
                                            <button onClick={() => like(PostDetail?._id)} className="flex items-center cursor-pointer text-gray-600 hover:text-red-500">
                                                <FaHeart className="mr-1 size-8" />
                                                <span className='text-2xl mx-2'>{post?.likes}</span>
                                            </button>
                                        )
                                    }
                                    <div className="">
                                        <button onClick={() => commentBtn(PostDetail?._id)} className="flex items-center text-gray-600 hover:text-blue-500 mx-2 ">
                                            <span className='text-2xl mx-2'>{post?.commentLength}</span>
                                            <FaComment className="mr-1 size-8" />
                                        </button>
                                    </div>
                                    {/* <button className="flex items-center text-gray-600 hover:text-green-500">
                                        <FaShare className="mr-1" />
                                        <span>Share</span>
                                        </button> */}
                                </div>
                            </div>
                            {
                                CommentInput == PostDetail?._id &&
                                <div className="flex w-full flex-row justify-end items-center rounded-lg ">
                                    <input onChange={handleCommentInput} className='w-96  p-2 my-2 rounded-lg mx-1' type="text" name='comment' value={comment} placeholder='What you think about the Post...' />
                                    <BsSendFill onClick={() => postComment(PostDetail?._id)} className='size-7 text-blue-600  mr-4' />
                                </div>
                            }
                        </div>
                    )
                })
            ) : (
                <>
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                </>
            )}

        </div>

    );
}

export default PostCard;