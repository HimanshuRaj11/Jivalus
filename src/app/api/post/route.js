import { getDataFromToken } from "@/helpers/getDataToken";
import connectDB from "@/lib/db";
import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


// create A Post
export async function POST(request) {
    try {
        await connectDB();
        const userId = await getDataFromToken(request);
        const { post, discription, music } = await request.json();
        console.log(userId);

        if (!userId) {
            // redirect("/")
            return NextResponse.json({ message: "User Not found" }, { status: "404" })
        }
        if (!post) {
            return NextResponse.json({ message: "Invalid Post" })
        }
        await Post.create({ user: userId, post, discription, music }).then(async (res) => {
            console.log(res);
            const finduserandupdate = await User.findByIdAndUpdate({ _id: userId }, { $push: { posts: res._id } })
            console.log(finduserandupdate);

            return NextResponse.json({ message: "Post Created", res }, { status: 201 })
        })
        return NextResponse.json({ message: "Post Created" }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Internal server Error" }, { status: 503 })
    }
}

