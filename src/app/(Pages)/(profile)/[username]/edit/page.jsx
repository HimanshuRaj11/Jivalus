"use client"

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { IoSettings } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import axios from 'axios';
import UploadProfileImage from '@/components/UploadProfileImage';
import { toast } from 'react-toastify';

const bannerImg = "https://t3.ftcdn.net/jpg/05/35/35/38/360_F_535353834_fAKyu7nTpbpNux5XdR5T63OUJ6gDOHlD.jpg"
const personSvg = "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
const baseUrl = "http://localhost:3000/api"

function page() {
  const { User } = useSelector((state) => ({ ...state.User }))
  const followers = User?.followers?.length
  const followings = User?.followings

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

  // handle Profile picture

  const OnchangeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader.result); // base64 encoded
    };

  }



  // Handle Profile Picture Submit

  const handlePicSubmit = async () => {
    try {
      if (!ProfileImage) {
        return
      }
      const res = await axios.post(`${baseUrl}/user/Update/ProfilePic`, { ProfileImage })
      if (res.status !== 201) {
        toast.error(`Somthing went wrong Please try again...`, {
          position: "top-right"
        });
        setProfileImage("")
        return
      }
      toast.success(`Profile Image Add successfull , please reload the page to view`, {
        position: "top-right"
      });
      setProfileImage("")
      return
    } catch (error) {
      return
    }
  }

  useEffect(() => {
    setUpdateUser({ ...User })
  }, [User])

  useEffect(() => {
    if (!ProfileImage) return;
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
              src={`${User?.profilePic ? User?.profilePic?.file : personSvg}`}
              alt="User Avatar"
              className="size-52 rounded-full object-fill"
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
              <img src={ProfileImage} className='size-72 object-cover' alt="" />
            </div>
            <Button onClick={handlePicSubmit}>Upload</Button>
          </div>
        )
      }


    </>
  )
}

export default page

