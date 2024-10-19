import { getDataFromToken } from "@/helpers/getDataToken";
import connectDB from "@/lib/db";
import Comment from "@/lib/models/comment.model.js";
import Post from "@/lib/models/post.model.js";
import User from "@/lib/models/user.model.js";
import { GetPost } from "@/lib/temp/getPosts";
import { NextResponse } from "next/server";


// Fetch Post by Id
export async function GET(request, { params: { _id } }) { // id of Post
    try {
        const postData = await GetPost({ _id })
        if (!postData) return
        return NextResponse.json({ message: "Post get Succesfully", postData }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Internal server Error", error: error.message }, { status: 503 })
    }
}
