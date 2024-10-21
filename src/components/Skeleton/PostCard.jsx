import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function PostCardSkeleton() {
    return (
        <div className='dark-shadow mx-auto rounded-lg  bg-light-component  dark:bg-dark-component shadow-lg overflow-hidden mt-2 mb-4'>
            <div className="flex items-center space-x-4 w-full p-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-6 my-2 w-[250px]" />
                    <Skeleton className="h-6 my-2 w-[200px]" />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Skeleton className="h-[30rem] w-[96%] rounded-xl my-3" />
            </div>
            <Skeleton className="h-6 my-2 mx-2 w-[250px]" />
        </div>
    )
}

export default PostCardSkeleton
