import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { FiPlusCircle } from "react-icons/fi";
import { useGlobalContext } from '../Context/ContextProvider';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'react-toastify';
const baseUrl = "http://localhost:3000/api"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel"

function CreatePost() {

    const { setCreatePostBtn } = useGlobalContext()
    const [PostData, setPostdata] = useState({
        description: "",
        location: ""
    })
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setPostdata((preVal) => {
            return { ...preVal, [name]: value }
        })
    }

    const [PostFiles, setFiles] = useState([]);
    const OnchangeFileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFiles((prevFiles) => [...prevFiles, reader.result]); // append to array
        };
    };

    const handlePostSubmit = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/post/create`, { PostFiles, PostData });
            console.log(res);
            setPostdata({
                description: "",
                location: ""
            })
            setFiles(null)
            toast.success("Post Created ", {
                position: "top-right"
            })
            setCreatePostBtn(false)
            setLoading(false)
            return

        } catch (error) {
            toast.error(`${error.message}`, {
                position: "top-right"
            })
            return

        }
    }


    return (
        <div className="z-10 fixed top-[4rem] backdrop-blur-lg w-full min-h-screen flex justify-center items-center ">
            <span className="fixed cursor-pointer top-8 right-20" onClick={() => (setCreatePostBtn(false))}>
                <ImCross className="dark:text-light-text text-dark-text text-2xl" />
            </span>
            {
                loading ?
                    <div className="z-[20] fixed top-[4rem] backdrop-blur-lg w-full min-h-screen flex justify-center items-center ">
                        <h1> Uploading ....</h1>
                    </div> : ""
            }

            <div className=" flex flex-col justify-center items-center w-full min-h-[80vh] ">
                <div className="flex flex-col relative items-center dark:bg-dark-component bg-light-component w-[50rem] h-[33rem] box-shadow rounded-lg">
                    <h1 className="dark:text-light-text text-dark-text text-2xl my-2">Create a Post</h1>
                    <div className="flex flex-row justify-around w-full">
                        <div className=" font-bold py-2 w-[48%] h-[26rem] mt-10 px-4 rounded flex justify-center items-center">
                            {
                                PostFiles && PostFiles.length > 0 ? (
                                    <div className="flex justify-center items-center relative">
                                        <div className="carousel w-full">
                                            <Carousel>
                                                <CarouselContent>
                                                    {PostFiles.map((file, index) => (
                                                        <CarouselItem>
                                                            <div key={index} className="carousel-item w-full">
                                                                <img src={file} alt={`file-${index}`} className="w-full" />
                                                            </div>
                                                        </CarouselItem>

                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious className="left-4 " />
                                                <CarouselNext className="right-4" />
                                            </Carousel>
                                        </div>
                                        <span className='absolute -bottom-10 right-2'>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={OnchangeFileHandler}
                                                name="files"
                                                id="file-upload"
                                                multiple
                                            />
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <span className="dark:text-light-text text-dark-text cursor-pointer hover:text-gray-800 flex items-center space-x-1">
                                                    <FiPlusCircle className="size-16" />
                                                </span>
                                            </label>
                                        </span>
                                    </div>
                                ) : (
                                    <div className="">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={OnchangeFileHandler}
                                            name="files"
                                            id="file-upload"
                                            multiple
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <span className="dark:text-light-text text-dark-text cursor-pointer hover:text-gray-800 flex items-center space-x-1">
                                                <FiPlusCircle className="size-64" />
                                            </span>
                                        </label>
                                    </div>
                                )
                            }

                        </div>
                        <div className=" w-[48%] h-[26rem]">
                            <div className="my-2">
                                <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                    Description
                                </h3>
                                <div className="mt-2">
                                    <textarea
                                        value={PostData.description}
                                        onChange={handleInputChange}
                                        name="description"
                                        placeholder='Description'
                                        className="min-h-[8rem] max-h-[8rem] p-2 size-96 block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="my-2">
                                <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                    Location
                                </h3>
                                <div className="mt-2">
                                    <input
                                        value={PostData.location}
                                        onChange={handleInputChange}
                                        type='text'
                                        name="location"
                                        placeholder='Location'
                                        className=" p-2 block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="my-2">
                                <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                                    Music
                                </h3>
                                <div className="mt-2">
                                    thik hai rahne do abhi..
                                </div>
                            </div>

                        </div>
                    </div>
                    <Button onClick={handlePostSubmit} className="absolute bottom-3 right-2 font-semibold bg-blue-600">Post</Button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost


