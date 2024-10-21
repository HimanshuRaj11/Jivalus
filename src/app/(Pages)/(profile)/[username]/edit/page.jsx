"use client"

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { IoSettings } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import axios from 'axios';
import UploadProfileImage from '@/components/UploadProfileImage';

const bannerImg = "https://t3.ftcdn.net/jpg/05/35/35/38/360_F_535353834_fAKyu7nTpbpNux5XdR5T63OUJ6gDOHlD.jpg"
const personSvg = "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
const baseUrl = "http://localhost:3000/api"

function page() {
  const { User, loading } = useSelector((state) => ({ ...state.User }))
  const followers = User?.followers?.length
  const followings = User?.followings
  const [PicUrl, setPicUrl] = useState(null)
  const [ProfileImage, setProfileImage] = useState(null)

  const [UpdatUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    boi: "",
    phone: "",
    countryCode: "",
  })




  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((preVal) => {
      return { ...preVal, [name]: value };
    });
  };

  const OnchangeHandler = (e) => {
    e.target.files && setProfileImage(e.target.files[0])
  }

  // Handle User Update Details Submit
  const handleUpdateInputs = async () => {
    console.log(UpdatUser);
    try {
      const res = await axios.post(`${baseUrl}/user/Update/Details`, UpdatUser)
      console.log(res);
      return

    } catch (error) {
      throw error
    }
  }

  // Handle Profile Picture Submit

  const handlePicSubmit = async () => {
    try {
      if (!ProfileImage) {
        return
      }
      const formData = new FormData();
      await formData.append("Profile", ProfileImage)
      formData.append('upload_preset', 'ml_default');



      const res = await axios.post(`${baseUrl}/user/Update/ProfilePic`, formData)
      console.log(res);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    setUpdateUser({ ...User })
  }, [User])
  useEffect(() => {
    if (!ProfileImage) return;
    setPicUrl(URL.createObjectURL(ProfileImage))
  }, [ProfileImage])


  return (
    <>

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
            <span className='absolute bottom-0 left-40 size-10'>
              <input type="file" name="" accept='image/*' id="file-input" onChange={OnchangeHandler} className="hidden" />
              <label htmlFor="file-input" className="cursor-pointer">
                <FaCamera className="size-10" />
              </label>
            </span>

            <div className="details w-full h-52 flex flex-row relative top-[80px] pt-10 pl-10 ">

              <div className="flex flex-col mx-4 ">
                <div className="" >
                  <span className="flex items-center">
                    <h1 className="text-2xl mr-2">@ {User?.username}</h1>

                  </span>
                  <span className="flex items-center my-2">
                    <input type="text" placeholder='First Name' name='firstName' onChange={handelInputChange} className='px-3' value={UpdatUser?.firstName} />
                  </span>
                  <span className="flex items-center my-2">
                    <input type="text" placeholder='Last Name' name='lastName' onChange={handelInputChange} className='px-3' value={UpdatUser?.lastName} />
                  </span>
                </div>
                <div className="w-44 my-2 h-36 overflow-hidden">
                  <textarea name="bio" onChange={handelInputChange} placeholder='Your Bio' value={UpdatUser?.bio}>

                  </textarea>
                </div>
              </div>



            </div>
          </div>
          <Button onClick={handleUpdateInputs}>Submit</Button>

          {/* <UploadProfileImage /> */}

        </div>


      </div>
      {
        ProfileImage && (
          <div className="z-10 overflow-hidden fixed flex-col backdrop-blur-sm w-full h-screen top-[4rem] flex justify-center items-center">
            <div className="box size-72 rounded-full overflow-hidden dark:bg-dark-component">
              <img src={PicUrl} className='size-72 object-cover' alt="" />
            </div>
            <Button onClick={handlePicSubmit}>Upload</Button>
          </div>
        )
      }


    </>
  )
}

export default page

