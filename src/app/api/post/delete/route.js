import { getDataFromToken } from "../../../../helpers/getDataToken";
import Post from "../../../../lib/models/post.model";
import User from "../../../../lib/models/user.model";
import { NextResponse } from "next/server";


// Delete A Post
export async function POST(request) {
    try {
        const userId = await getDataFromToken(request);
        const { post_id } = await request.json();

        if (!userId) return NextResponse.json({ message: "User Not found" }, { status: "404" })

        if (!post_id) return NextResponse.json({ message: "Post not found!" })

        await Post.findOneAndDelete({ _id: post_id }).catch((error) => { return error })
        await User.findByIdAndUpdate({ _id: userId }, { $pull: { posts: post_id } })

        return NextResponse.json({ message: "Post Deleted" }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Internal server Error", error: error.message }, { status: 503 })
    }
}

