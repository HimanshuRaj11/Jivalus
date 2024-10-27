"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaEllipsisH, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import UserProfileInfo from '../../../components/userProfileInfo';
const commonClass = ' p-2 dark-shadow mx-2 rounded-lg  bg-light-component  dark:bg-dark-component shadow-lg  mt-2 mb-4 h-[89vh]'
const profileSvg = 'https://www.svgrepo.com/show/327465/person-circle.svg'
import { MdKeyboardVoice } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import { BsSendFill } from "react-icons/bs";
import { FaFaceGrin } from "react-icons/fa6";
import axios from 'axios';
import { selectProcessedUsers } from '../../../Redux/selector';
import { useSelector } from 'react-redux';
import useSocket from "../../../lib/hooks/useSocket"

const listStyle = "flex items-center justify-between bg-lightbg rounded-lg dark:bg-darkbg p-1 my-2"
const scrollBarStyle = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`;


function page() {
  // const socket = useSocket();

  const [user_Details, setUser_details] = useState(null)
  const [chatLists, setchatlists] = useState([])
  const [selectedChat, setSelectedChat] = useState()
  const [InputMessage, setInputMessage] = useState("")
  const [socketConnection, setSocketConnection] = useState(false)
  const [searchUser, setsearchUser] = useState(null)

  const { User } = useSelector(selectProcessedUsers)
  const followings = User?.followings

  const ChatList = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/chats/chatList`)
      setchatlists(data.chatsList);
    } catch (error) {
      return error
    }
  }
  const selectChat = async (chat_id) => {
    const { data } = await axios.get(`http://localhost:3000/api/chats/${chat_id}`)
    setSelectedChat(data.chat)

    // if (socket) {
    //   socket.emit("JoinChat", chat_id)
    // }
  }
  const getUser_Details = (user) => {
    setUser_details(user)
  }

  //handle change in message
  const handleMessagechange = (e) => {
    const { value } = e.target;
    setInputMessage(value)
  }
  // send message
  const sendMessage = async (_id) => {
    try {
      const message = InputMessage
      const sender = User._id
      const { data } = await axios.post(`http://localhost:3000/api/chats/${_id}`, { message, sender })

    } catch (error) {
      console.log(error);
      return error

    }
  }
  // search users to chat
  const HandleSearchChange = async (e) => {
    try {
      const { value } = e.target;
      if (value.length > 0) {
        const { data } = await axios.post(`http://localhost:3000/api/searchUsers/`, { search: value })
        setsearchUser(data.users);
      } else {
        setsearchUser(null)
      }

    } catch (error) {
      return error
    }
  }

  //use effect
  useEffect(() => {
    ChatList()
    // if (socket) {
    //   console.log(User);

    //   socket.emit("LogedInUser", (User));
    //   socket.on("connection", () => setSocketConnection(true));
    // }
  }, [])



  return (
    <div className="w-[90vw] flex justify-start">

      <div className='w-full h-screen flex justify-start '>
        {/* chats List */}
        <div className={` ${commonClass} hidden md:flex flex-col  w-[280px]`} >
          <div className="p-2 flex justify-center items-center w-full h-14">
            <h1 className='text-2xl font-bold'>CHATS</h1>
          </div>
          <div className=" h-[1px] w-full my-2 bg-darkbg dark:bg-lightbg"></div>
          <div className="w-full p-2 flex justify-center items-center">
            <input
              type="text"
              onChange={HandleSearchChange}
              placeholder="Search..."
              className="md:w-96 px-3 py-2 border bg-lightbg dark:bg-darkbg rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className={`overflow-y-auto ${scrollBarStyle}`}>
            {
              searchUser && searchUser?.length > 0 ? (
                searchUser.map((userDetails, i) => {
                  return (
                    <li className={`${listStyle} text-sm cursor-pointer`} key={i} onClick={() => { }}>
                      <div className="w-full p-2 h-12 rounded-md flex flex-row items-center">
                        <img className="size-12 mr-2 rounded-full" src={userDetails?.profilePic ? userDetails?.profilePic.file : profileSvg} alt={""} />
                        <div className="flex flex-col justify-center w-full">
                          <span className='text-lg'>{userDetails?.firstName + " " + userDetails?.lastName}</span>
                          <div className='flex flex-row  justify-between w-full'>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              ) : (<>
                {
                  chatLists && chatLists.length > 0 ?
                    chatLists?.map((chat, i) => {
                      const userDetails = chat?.user
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
                        <li className={`${listStyle} text-sm cursor-pointer`} key={i} onClick={() => { selectChat(chat?.chat_id), getUser_Details(userDetail) }}>
                          <div className="w-full p-2 h-12 rounded-md flex flex-row items-center">
                            <img className="size-12 mr-2 rounded-full" src={userDetails?.profilePic ? userDetails?.profilePic.file : profileSvg} alt={""} />
                            <div className="flex flex-col justify-center w-full">
                              <span className='text-lg'>{userDetails?.firstName + " " + userDetails?.lastName}</span>
                              <div className='flex flex-row  justify-between w-full'>
                                <span className='bg-green-600 size-3 rounded-full'></span>
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    })
                    : ""
                }</>)
            }



          </div>
        </div>

        {/* Chats */}
        {
          selectedChat ? (

            <div className={` ${commonClass} mr-8  w-[80%] md:w-[67%] lg:w-[70%]`}>

              <div className="w-full h-14 p-2">
                <div className="flex w-full justify-between tems-center flex-row">
                  <UserProfileInfo userDetails={user_Details} />
                  <FaEllipsisH className="text-gray-600 cursor-pointer" />
                </div>
              </div>

              <div className=" h-[1px] w-full my-2 bg-darkbg dark:bg-lightbg "></div>
              {/* chat area */}

              <div className="h-[78%] flex flex-col justify-end">
                <div className={`overflow-y-auto max-h-full p-3 ${scrollBarStyle}`}>
                  {selectedChat?.messages && selectedChat?.messages.length > 0 ?
                    selectedChat?.messages.map((message, i) => {
                      const sender = message.sender;
                      const isUsersend = sender === User._id;
                      const date = new Date(message.createdAt);
                      const hours = date.getHours();
                      const minutes = date.getMinutes();
                      const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

                      return (
                        <>
                          {isUsersend ? (
                            <div key={i + 1} className='w-full flex justify-end items-center  my-1'>
                              <div className="relative rounded-md max-w-[52%] py-1 flex justify-end items-center bg-lightbg dark:bg-darkbg">
                                <span className='m-2'>{message.message}</span>
                                <img src={User?.profilePic?.file ? User?.profilePic?.file : profileSvg} className='size-10 m-2 rounded-full' alt="" />
                                <span className='absolute bottom-0 left-1 text-sm '>{time}</span>
                              </div>
                            </div>
                          ) : (
                            <div key={i} className='w-full flex justify-start my-1'>
                              <div className="relative rounded-md max-w-[52%] py-1 flex justify-start items-center bg-lightbg dark:bg-darkbg">
                                <img src={user_Details?.profilePic?.file ? user_Details?.profilePic?.file : profileSvg} className='size-10 m-2 rounded-full' alt="" />
                                <span className=' max-w-full m-2'>{message.message}</span>
                                <span className='absolute bottom-0 right-1 text-sm '>{time}</span>
                              </div>
                            </div>
                          )}
                        </>
                      )
                    })
                    : ""}
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
                  onChange={handleMessagechange}
                  value={InputMessage}
                  placeholder="Message..."
                  className="w-[80%] p-1 border bg-lightbg dark:bg-darkbg rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                </textarea>
                <div className="flex items-center justify-around w-[15%]">
                  <MdKeyboardVoice className='size-8 font-bold cursor-pointer' />
                  <ImAttachment className='size-8 font-bold cursor-pointer' />
                  <BsSendFill onClick={() => sendMessage(selectedChat._id)} className='size-8 font-bold cursor-pointer text-blue-600' />
                </div>

              </div>

            </div>

          ) : ""
        }


      </div>
    </div >
  )
}

export default page
