import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function ProfilePageSkeleton() {
    return (
        <div>
            {/* Profile banner or details skeleton */}
            <div className="">
                <div className="">
                    <Skeleton className="h-[18rem] w-[96%] rounded-xl my-3" />
                </div>
                <div className="profileDetails relative top-[-100px] flex">
                    <Skeleton className="size-52 rounded-full " />
                    <div className="w-full h-52 flex flex-row relative top-[80px] pt-8 pl-10">
                        <div className="flex flex-col w-[35%] mx-4">
                            <Skeleton className="h-6 w-96 rounded-xl my-3" />
                            <Skeleton className="h-6 w-96 rounded-xl my-3" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ProfilePageSkeleton
