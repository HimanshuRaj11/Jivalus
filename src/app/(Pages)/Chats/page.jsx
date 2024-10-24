"use client"
import Link from 'next/link';
import React from 'react'
import { FaEllipsisH, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import UserProfileInfo from '../../../components/userProfileInfo';
const commonClass = ' p-2 dark-shadow mx-2 rounded-lg  bg-light-component  dark:bg-dark-component shadow-lg  mt-2 mb-4 h-[89vh]'
const profileSvg = 'https://www.svgrepo.com/show/327465/person-circle.svg'
import { MdKeyboardVoice } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import { BsSendFill } from "react-icons/bs";
import { FaFaceGrin } from "react-icons/fa6";
const listStyle = "flex items-center justify-between bg-lightbg rounded-lg dark:bg-darkbg p-1 my-2"
const scrollBarStyle = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`;


function page() {
  const userDetails = {
    profilePic: {
      file: ""
    },
    isFollowing: false,
    _id: "76bhbgyfjg",
    username: "username",
    firstName: "himanshu",
    lastName: "raj"
  }

  return (
    <div className="w-[90vw] flex justify-start">

      <div className='w-full h-screen flex justify-start '>
        {/* chats List */}
        <div className={` ${commonClass} hidden md:flex flex-col  w-[25%]`} >
          <div className="p-2 flex justify-center items-center w-full h-14">
            <h1 className='text-2xl font-bold'>CHATS</h1>
          </div>
          <div className=" h-[1px] w-full my-2 bg-darkbg dark:bg-lightbg"></div>
          <div className="w-full p-2 flex justify-center items-center">
            <input
              type="text"
              placeholder="Search..."
              className="md:w-96 px-3 py-2 border bg-lightbg dark:bg-darkbg rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className={`overflow-y-auto ${scrollBarStyle}`}>
            {
              <li className={`${listStyle} text-sm`} key={1}>
                <div className="w-full p-2 h-12 rounded-md flex flex-row items-center">
                  <img className="size-12 mr-2 rounded-full" src={profileSvg} alt={""} />
                  <div className="flex flex-col justify-center w-full">
                    <span className='text-xl'>Name</span>
                    <div className='flex flex-row  justify-between w-full'>
                      <span className='mr-2 max-w-[50%] overflow-hidden max-h-6' >last message farom this side</span>
                      <span className='text-gray-700 text-sm'> 2 hrs ago </span>
                      <span className='bg-green-600 size-5  items-center flex justify-center rounded-full text-sm font-normal '>10</span>
                    </div>
                  </div>
                </div>
              </li>
            }
          </div>
        </div>

        {/* Chats */}
        <div className={` ${commonClass} mr-8  w-[80%] md:w-[67%] lg:w-[70%]`}>
          <div className="w-full h-14 p-2">
            <div className="flex w-full justify-between tems-center flex-row">
              <UserProfileInfo userDetails={userDetails} />
              <FaEllipsisH className="text-gray-600 cursor-pointer" />
            </div>
          </div>
          <div className=" h-[1px] w-full my-2 bg-darkbg dark:bg-lightbg "></div>
          {/* chat area */}
          <div className="h-[78%] flex flex-col justify-end">
            <div className={`overflow-y-auto max-h-full p-3 ${scrollBarStyle}`}>

              {/* messages */}
              <div div className='w-full flex justify-start my-1'>
                <div className="rounded-md max-w-[52%] py-1   flex justify-start items-center bg-lightbg dark:bg-darkbg">
                  <img src={profileSvg} className='size-10 mx-2' alt="" />
                  <span className=' max-w-full mx-2'>Heloo.. Lorem, , eius sunt voluptates officia.</span>
                </div>
              </div>

              <div className='w-full flex justify-end items-center  my-1'>
                <div className="rounded-md max-w-[52%] py-1 flex justify-end items-center bg-lightbg dark:bg-darkbg">
                  <span className='mx-2'>hey..</span>
                  <img src={profileSvg} className='size-10 mx-2' alt="" />
                </div>
              </div>
              {/* messages */}

            </div>
          </div>

          {/* message input */}
          <div className=" h-[1px] w-full my-2 bg-darkbg dark:bg-lightbg"></div>
          <div className="p-1 w-full h-16 flex flex-row items-center">
            <div className="w-[5%] flex items-center justify-around cursor-pointer text-yellow-400 ">
              <FaFaceGrin className='size-8 font-bold' />
            </div>
            <textarea
              type="text"
              placeholder="Message..."
              className="w-[80%] p-1 border bg-lightbg dark:bg-darkbg rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            </textarea>
            <div className="flex items-center justify-around w-[15%]">
              <MdKeyboardVoice className='size-8 font-bold cursor-pointer' />
              <ImAttachment className='size-8 font-bold' cursor-pointer />
              <BsSendFill className='size-8 font-bold cursor-pointer text-blue-600' />
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

export default page
