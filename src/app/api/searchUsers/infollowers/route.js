import { NextResponse } from "next/server"
import User from "../../../../lib/models/user.model"
import { getDataFromToken } from "../../../../helpers/getDataToken";

export async function GET(request) {
    try {
        const userId = await getDataFromToken();

        const user = await User.findOne({ _id: userId }).select("followers")
        if (!user) return NextResponse.json({ message: "User not LogedIn" }, { status: 405 })
        const usersFollowersId = user.followers

        const usersInFollowers = await User.find({
            _id: { $in: usersFollowersId }
        }).select('_id username firstName lastName profilePic isVerfied')

        return NextResponse.json({ usersInFollowers })
    } catch (error) {
        return NextResponse.json({ message: error.message })
    }
}