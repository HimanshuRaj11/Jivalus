import { getDataFromToken } from "@/helpers/getDataToken";
import User from "@/lib/models/user.model.js";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { _id } = await request.json();
        const userId = await getDataFromToken(request);
        if (!userId) return

        // check Following - add in my following list
        const Following = await User.findOne({ _id: userId })
        const isFollowing = Following.followings.includes(_id)

        if (!isFollowing) {
            await User.findOneAndUpdate({ _id: userId }, {
                $push: {
                    followings: _id
                }
            })
        }

        // // check followers - me add in their followers list
        const Follower = await User.findOne({ _id })
        const isFollower = Follower.followers.includes(userId)


        if (!isFollower) {
            await User.findOneAndUpdate({ _id }, {
                $push: {
                    followers: userId
                }
            })
        }


        return NextResponse.json({ message: "followed", success: true }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 503 })
    }
}