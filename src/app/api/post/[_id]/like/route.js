import { getDataFromToken } from "@/helpers/getDataToken";
import Post from "@/lib/models/post.model";
import { GetPost } from "@/lib/temp/getPosts"
import { NextResponse } from "next/server"

export async function POST(request, { params: { _id } }) { // id of Post
    try {
        const userId = await getDataFromToken();
        if (!userId) return
        const { post: { likes } } = await GetPost({ _id })
        let like = null

        const isLiked = likes.includes(userId)
        if (isLiked) {
            const postToDislike = await Post.findOneAndUpdate({ _id }, {
                $pull: { likes: userId }
            })
            like = false
        } else {
            const postTolike = await Post.findOneAndUpdate({ _id }, {
                $push: { likes: userId }
            })
            like = true
        }


        return NextResponse.json({ like }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Internal server Error", error: error.message }, { status: 503 })
    }
}
