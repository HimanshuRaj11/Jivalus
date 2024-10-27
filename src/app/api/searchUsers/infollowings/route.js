import { NextResponse } from "next/server"
import User from "../../../../lib/models/user.model"
import { getDataFromToken } from "../../../../helpers/getDataToken";

export async function GET(request) {
    try {
        const userId = await getDataFromToken();

        const user = await User.findOne({ _id: userId }).select("followings")
        if (!user) return NextResponse.json({ message: "User not LogedIn" }, { status: 405 })
        const usersFollowingsId = user.followings

        const usersInFollowings = await User.find({
            _id: { $in: usersFollowingsId }
        }).select('_id username firstName lastName profilePic isVerfied')

        return NextResponse.json({ usersInFollowings })
    } catch (error) {
        return NextResponse.json({ error })
    }
}