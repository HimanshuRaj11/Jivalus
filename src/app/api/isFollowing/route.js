import User from "@/lib/models/user.model"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { _id } = await request.json();
        const userId = await getDataFromToken(request);

        const Following = await User.findOne({ _id: userId })
        const isFollowing = Following.followings.includes(_id)

        return NextResponse.json({ isFollowing: isFollowing }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 503 })
    }
}