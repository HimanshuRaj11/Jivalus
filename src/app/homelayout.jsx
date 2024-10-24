"use client"

import LeftSideBar from "../components/LeftSideBar"


export default function HomeLayout({ children }) {
    return (
        <div className="w-full justify-around sm:justify-normal flex lg:justify-around  min-h-screen ">

            <LeftSideBar />
            <div className=" w-[80%] lg:w-[50%] ml-4  ">
                {children}
            </div>

        </div>
    )
}