import { getDataFromToken } from "@/helpers/getDataToken";
import connectDB from "@/lib/db";
import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";


// create A Post
export async function POST(request) {
    try {
        const userId = await getDataFromToken(request);
        const { file, discription, music } = await request.json();
        if (!userId) return NextResponse.json({ message: "User Not found" }, { status: "404" })

        if (!file && !discription) return NextResponse.json({ message: "Invalid Post" })

        const res = await Post.create({ user: userId, file, discription, music }).catch((error) => { return error })
        await User.findByIdAndUpdate({ _id: userId }, { $push: { posts: res._id } })

        return NextResponse.json({ message: "Post Created" }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Internal server Error" }, { status: 503 })
    }
}

