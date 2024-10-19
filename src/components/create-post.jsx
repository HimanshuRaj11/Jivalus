import React from 'react'
import { ImCross } from "react-icons/im";
import { FiPlusCircle } from "react-icons/fi";
import { useGlobalContext } from '@/Context/ContextProvider';
import { Button } from './ui/button';
function CreatePost() {

    const { setCreatePostBtn } = useGlobalContext()


    return (
        <div className="z-10 fixed top-[4rem] backdrop-blur-lg w-full min-h-screen flex justify-center items-center ">
            <span className="fixed cursor-pointer top-8 right-20" onClick={() => (setCreatePostBtn(false))}>
                <ImCross className="dark:text-light-text text-dark-text text-2xl" />
            </span>

            <div className=" flex flex-col justify-center items-center w-full min-h-[80vh] ">
                <div className="flex flex-col relative items-center dark:bg-dark-component bg-light-component w-[40rem] h-[30rem] box-shadow rounded-lg">
                    <h1 className="dark:text-light-text text-dark-text text-2xl my-4">Create a Post</h1>

                    {/* <UploadImage /> */}
                    <AddDetails />


                    <Button className="absolute bottom-3 right-2">Next</Button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost


const UploadImage = () => {
    return (
        <button className=" font-bold py-2 mt-10 px-4 rounded">
            <input type="file" className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer">
                <span className=" dark:text-light-text text-dark-text cursor-pointer hover:text-gray-800 flex items-center space-x-1">
                    <FiPlusCircle className="size-64" />
                </span>
            </label>
        </button>
    )
}

const AddDetails = () => {
    return (
        <div className="w-[80%]">


            <div className="my-2">
                <h3 className="block text-sm font-medium leading-6 text-dark-text dark:text-light-text">
                    Description
                </h3>
                <div className="mt-2">
                    <textarea
                        name="description"
                        placeholder='Description'
                        className="min-h-[8rem] max-h-[8rem] p-2 size-96 block w-full rounded-md border-0 py-1.5 text-dark-text dark:text-light-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

        </div>

    )
}