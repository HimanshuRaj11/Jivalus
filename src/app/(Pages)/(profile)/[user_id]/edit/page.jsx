"use client"

import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { IoSettings } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaCamera } from "react-icons/fa";

const bannerImg = "https://t3.ftcdn.net/jpg/05/35/35/38/360_F_535353834_fAKyu7nTpbpNux5XdR5T63OUJ6gDOHlD.jpg"
const personSvg = "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"


function page() {
  const { User, loading } = useSelector((state) => ({ ...state.User }))

  const posts = [
    {
      image: "https://via.placeholder.com/150",
      title: "Post One",
      description: "This is the description for post one.",
      likes: 120,
      shares: 30,
      comments: 15
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Post Two",
      description: "This is the description for post two.",
      likes: 90,
      shares: 20,
      comments: 10
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Post Three",
      description: "This is the description for post three.",
      likes: 150,
      shares: 40,
      comments: 25
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Post Four",
      description: "This is the description for post four.",
      likes: 200,
      shares: 50,
      comments: 30
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Post Five",
      description: "This is the description for post five.",
      likes: 75,
      shares: 15,
      comments: 5
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Post Six",
      description: "This is the description for post six.",
      likes: 60,
      shares: 10,
      comments: 8
    }
  ];
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
            className="size-52 rounded-full"
          />
          <FaCamera className="absolute bottom-0 left-40 cursor-pointer size-10" />
          <div className="details w-full h-52 flex flex-row relative top-[80px] pt-10 pl-10 ">

            <div className="flex flex-col w-[35%] mx-4 ">
              <div className="" >
                <span className="flex items-center">
                  <h1 className="text-2xl mr-2">username</h1>
                  <MdModeEdit className="cursor-pointer" />
                </span>
                <span className="flex items-center">
                  <h1 className="text-2xl mr-2">Name lastname</h1>
                  <MdModeEdit className="cursor-pointer" />
                </span>
              </div>
              <div className="w-44 my-2 h-36 overflow-hidden">
                <p className="text-sm leading-5"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero explicabo perferendis commodi consequuntur alias sed itaque neque porro sunt rerum.</p>
              </div>
            </div>

            <div className="flex flex-col justify-around items-center w-[56%] ">

              <div className="flex justify-end w-full mx-4 items-center">
                {/* <Button className="font-semibold">Edit Profile</Button>
                <Button className="font-semibold">Insights</Button> */}
                <span className="font-semibold"><IoSettings className="size-9 cursor-pointer text-dark-text dark:text-light-text " /></span>
              </div>

              <div className="flex justify-around w-full mx-4 items-center">
                <div className="flex flex-col p-2 justify-center items-center">
                  <h2 className="text-lg font-semibold items-center" >1454</h2>
                  <h2 className="text-md text-gray-400">Followings</h2>
                </div>

                <div className="v-line h-8 w-[1px]  bg-darkbg dark:bg-lightbg"></div>

                <div className="flex flex-col p-2 justify-center items-center">
                  <h2 className="text-lg font-semibold items-center" >144</h2>
                  <h2 className="text-md text-gray-400">Followers</h2>
                </div>
                <div className="v-line h-8 w-[1px]  bg-darkbg dark:bg-lightbg"></div>

                <div className="flex flex-col p-2 justify-center items-center">
                  <h2 className="text-lg font-semibold items-center" >14</h2>
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
          {posts.map((post, index) => (
            <div
              key={index}
              className="relative bg-light-component dark:bg-dark-component shadow-md my-2 rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <span className="size-10  cursor-pointer backdrop-blur-md absolute top-2 right-2 flex justify-center items-center">
                <MdDelete className=" size-6" />
              </span>
              <img src={post.image} alt={post.title} className="w-full min-h-52 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500 text-sm">Likes: {post.likes}</span>
                  <span className="text-gray-500 text-sm">Shares: {post.shares}</span>
                  <span className="text-gray-500 text-sm">Comments: {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
