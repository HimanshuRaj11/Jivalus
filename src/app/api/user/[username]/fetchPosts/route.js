import { getDataFromToken } from "../../../../../helpers/getDataToken";
import Post from "../../../../../lib/models/post.model";
import User from "../../../../../lib/models/user.model";
import { NextResponse } from "next/server";

export async function GET(request, { params: { username } }) {
    try {
        const { _id } = await User.findOne({ username })
        const UsersPosts = await Post.find({ user: _id })
        return NextResponse.json({ UsersPosts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 503 })

    }
}