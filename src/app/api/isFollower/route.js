import User from "@/lib/models/user.model"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { _id } = await request.json();
        const userId = await getDataFromToken(request);

        const Follower = await User.findOne({ _id })
        const isFollower = Follower.followers.includes(userId)

        return NextResponse.json({ isFollower: isFollower }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 503 })
    }
}