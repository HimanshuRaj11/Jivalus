import { GetPost } from "@/lib/temp/getPosts";
import { NextResponse } from "next/server";

const post_id = ["6713c6858c3fc26ee0dc718f", "6713c6708c3fc26ee0dc718c"]
export async function GET(params) {
    try {

        let Posts = []
        for (const _id of post_id) {
            const postData = await GetPost({ _id })
            if (postData) {
                Posts.push(postData)
            }
        }
        return NextResponse.json({ Posts })

    } catch (error) {
        return NextResponse.json({ error })
    }
}