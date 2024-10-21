import connectDB from "@/lib/db";
import Post from "@/lib/models/post.model";
import { GetPost } from "@/lib/temp/getPosts";
import { NextResponse } from "next/server";

const post_id = ["6713c6858c3fc26ee0dc718f", "6713c6708c3fc26ee0dc718c", "671550742852d149515ba145", "671555542852d149515ba1d9", "67163e28ee51a4bd8391273b"]
export async function GET(params) {
    try {
        let Posts = []
        for (const _id of post_id) {
            const postData = await GetPost({ _id })
            if (postData) {
                Posts.push(postData)
            }
        }

        return NextResponse.json({ Posts, message: "Posts fetched", success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error }, { status: 503 })
    }
}