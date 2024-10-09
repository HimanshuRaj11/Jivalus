import React from 'react';
import { FaEllipsisH, FaHeart, FaComment, FaShare } from 'react-icons/fa';

function PostCard({ user, description, image, likes, comments }) {
    return (
        <div className="dark-shadow mx-auto rounded-lg  bg-light-component  dark:bg-dark-component shadow-lg overflow-hidden mt-2 mb-4">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full" src={user.profileImage} alt={user.name} />
                    <div className="ml-3">
                        <p className="dark:text-light-text text-dark-text font-semibold">{user.name}</p>
                        <p className="text-gray-600 text-sm">{user.username}</p>
                    </div>
                </div>
                <FaEllipsisH className="text-gray-600 cursor-pointer" />
            </div>
            <div className="px-4">
                <p className="text-gray-700 text-sm">2 hours ago</p>
            </div>
            <div className="px-4 py-2">
                <p className="dark:text-light-text text-dark-text">{description}</p>
            </div>
            {image && (
                <div className="p-4">
                    <img className="w-full h-80 object-cover rounded-lg" src={image} alt="Post" />
                </div>
            )}
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-red-500">
                        <FaHeart className="mr-1" />
                        <span>{likes}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-500">
                        <FaComment className="mr-1" />
                        <span>{comments}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-green-500">
                        <FaShare className="mr-1" />
                        <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostCard;