import { getDataFromToken } from "@/helpers/getDataToken";
import Post from "../../../../lib/models/post.model";
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";

export async function GET(request) {
    try {
        await connectDB()
        const userId = await getDataFromToken();
        if (!userId) return
        const UsersPosts = await Post.find({ user: userId })

        return NextResponse.json({ UsersPosts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 503 })

    }
}