import axios from 'axios'
import Link from 'next/link'
import React from 'react'
const profileSvg = 'https://www.svgrepo.com/show/327465/person-circle.svg'

function UserProfileInfo({ userDetails }) {
    const { username, firstName, lastName, isFollowing, profilePic, _id } = userDetails


    const follow = async () => {
        try {
            if (!_id) {
                setLoginBtn(true)
            }
            const res = await axios.post("http://localhost:3000/api/user/follow", { _id })
            console.log(res);

        } catch (error) {
            console.log(error);

            return error
        }
    }
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full" src={profilePic ? profilePic : profileSvg} alt={""} />
                <div className="ml-3">
                    <span className='flex flex-row '>
                        <Link href={`http://localhost:3000/${username}`} className="mr-3 dark:text-light-text text-dark-text font-semibold">
                            {firstName + " " + lastName}
                        </Link>
                        {
                            isFollowing ? "" : <span onClick={follow} className=" text-blue-600 font-semibold cursor-pointer">Follow</span>
                        }

                    </span>
                    <Link href={`http://localhost:3000/${username}`} className="text-gray-600 text-sm">@ {username}</Link>
                </div>
            </div>
        </div>
    )
}

export default UserProfileInfo
