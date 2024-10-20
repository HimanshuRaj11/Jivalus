"use client"


// import { selectPosts } from '@/Redux/Slices/PostsSlice';
import React, { useEffect, useState } from 'react';
import { FaEllipsisH, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { useSelector } from 'react-redux';



function PostCard({ user, description, image, likes, comments }) {

    const { Posts } = useSelector((state) => state.Posts);

    return (

        <div>
            {Posts && Posts.length > 0 ? (
                Posts.map((post, index) => {
                    const PostDetail = post.post
                    const PostFile = PostDetail.file
                    const User = post?.userDetails

                    return (
                        <div key={index + 1} className="dark-shadow mx-auto rounded-lg  bg-light-component  dark:bg-dark-component shadow-lg overflow-hidden mt-2 mb-4">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center">
                                    <img className="w-10 h-10 rounded-full" src={User.profilePic} alt={""} />
                                    <div className="ml-3">
                                        <p className="dark:text-light-text text-dark-text font-semibold">{User.firstName + " " + User.lastName}</p>
                                        <p className="text-gray-600 text-sm">@ {User.username}</p>
                                    </div>
                                </div>
                                <FaEllipsisH className="text-gray-600 cursor-pointer" />
                            </div>
                            <div className="px-4">
                                <p className="text-gray-700 text-sm">2 hours ago</p>
                            </div>
                            <div className="px-4 py-2">
                                <p className="dark:text-light-text text-dark-text">{PostDetail.discription}</p>
                            </div>
                            {
                                PostFile?.map((file) => {
                                    return (
                                        <div className="p-4">
                                            <img className="w-full h-80 object-cover rounded-lg" src={file} alt="Post" />
                                        </div>
                                    )
                                })
                            }

                            <div className="flex items-center justify-between px-4 py-2">
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center text-gray-600 hover:text-red-500">
                                        <FaHeart className="mr-1" />
                                        <span>{post.likes}</span>
                                    </button>
                                    <button className="flex items-center text-gray-600 hover:text-blue-500">
                                        <FaComment className="mr-1" />
                                        <span>{post.commentLength}</span>
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