import React from 'react'
import { ImCross } from "react-icons/im";
import { FiPlusCircle } from "react-icons/fi";
import { useGlobalContext } from '@/Context/ContextProvider';
function CreatePost() {

    const { setCreatePostBtn } = useGlobalContext()


    return (
        <div className="z-10 fixed top-[4rem] backdrop-blur-lg w-full min-h-screen flex justify-center items-center ">
            <span className="fixed cursor-pointer top-8 right-20" onClick={() => (setCreatePostBtn(false))}>
                <ImCross className="dark:text-light-text text-dark-text text-2xl" />
            </span>
            <div className=" flex flex-col justify-center items-center w-full min-h-[80vh] ">
                <div className="flex flex-col justify-center items-center dark:bg-dark-component bg-light-component w-[40rem] h-[30rem] box-shadow rounded-lg">
                    <h1 className="dark:text-light-text text-dark-text text-2xl my-4">Create a Post</h1>
                    <button className=" font-bold py-2 px-4 rounded">
                        <input type="file" className="hidden" id="file-upload" />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <span className=" dark:text-light-text text-dark-text cursor-pointer hover:text-gray-800 flex items-center space-x-1">
                                <FiPlusCircle className="size-64" />
                            </span>
                        </label>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
