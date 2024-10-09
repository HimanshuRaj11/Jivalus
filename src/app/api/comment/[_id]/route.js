

import { getDataFromToken } from "@/helpers/getDataToken";
import connectDB from "@/lib/db";
import Comment from "@/lib/models/comment.model.js";
import Post from "@/lib/models/post.model.js";
import { NextResponse } from "next/server";


export async function POST(request, { params: { _id } }) {            // here _id is Id of Post
    try {
        const { comment } = await request.json()
        await connectDB();
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ message: "User Not found" }, { status: 404 })
        }
        await Comment.create({ user: userId, comment }).then(async (res) => {
            await Post.findByIdAndUpdate({ _id }, { $push: { comments: res._id } })
        })
        return NextResponse.json({ message: "Comment Done" })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Internal server Error" }, { status: 503 })
    }
}