

import { getDataFromToken } from "../../../../helpers/getDataToken.js";
import Comment from "../../../../lib/models/comment.model.js";
import Replies from "../../../../lib/models/replies.model";
import { NextResponse } from "next/server";


export async function POST(request, { params: { _id } }) {            // here _id is Id of Comments
    try {
        const { replies } = await request.json()
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ message: "User Not found" }, { status: 404 })
        }
        await Replies.create({ user: userId, replies }).then(async (res) => {
            await Comment.findByIdAndUpdate({ _id }, { $push: { replies: res._id } })
        })
        return NextResponse.json({ message: "reply Done" })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Internal server Error" }, { status: 503 })
    }
}