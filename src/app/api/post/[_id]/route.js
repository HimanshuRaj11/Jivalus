import { getDataFromToken } from "@/helpers/getDataToken";
import connectDB from "@/lib/db";
import Comment from "@/lib/models/comment.model.js";
import Post from "@/lib/models/post.model.js";
import User from "@/lib/models/user.model.js";
import { NextResponse } from "next/server";


// Fetch Post by Id
export async function GET(request, { params: { _id } }) { // id of Post
    try {
        // const userId = await getDataFromToken(request);

        await connectDB();
        const post = await Post.findById({ _id })
        const { user, comments, likes } = post;
        const userDetails = await User.findById({ _id: user }).select("username firstname lastname profile")
        // const commentsget = await Comment.findById({ _id: comment })

        const postData = { post, userDetails, comments, commentLength: comments.length, likes: likes.length }

        return NextResponse.json({ message: "Post get Succesfully", postData }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Internal server Error", error: error.message }, { status: 503 })
    }
}

export async function DELETE(request, { params: { _id } }) {
    try {
        await connectDB();
        const post = await Post.findByIdAndDelete({ _id })
        return NextResponse.json({ message: "Post Deleted Succesfully", post }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal server Error" }, { status: 503 })
    }
}
export async function PUT(request, { params: { _id } }) {
    try {
        const { post, discription, music } = await request.json();
        await connectDB();
        const UpdatePost = await Post.findByIdAndUpdate({ _id }, { post, discription, music })
        return NextResponse.json({ message: "Post Updated Succesfully", UpdatePost }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal server Error" }, { status: 503 })
    }
}
