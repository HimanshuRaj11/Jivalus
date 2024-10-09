"use client"

import LeftSideBar from "@/components/LeftSideBar"
import RightSideBar from "@/components/RightSideBar"

export default function HomeLayout({ children }) {
    return (
        <div className="w-full flex justify-around bg-lightbg dark:bg-darkbg min-h-screen ">

            <LeftSideBar />
            <div className=" w-[80%] lg:w-[50%]">
                {children}
            </div>
            <RightSideBar />
        </div>
    )
}