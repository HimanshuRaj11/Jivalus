import { getDataFromToken } from "@/helpers/getDataToken";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";


// create A Post
export async function POST(request) {
    try {
        const userId = await getDataFromToken(request);
        const { file, discription, music } = await request.json();
        if (!userId) return NextResponse.json({ message: "User Not found" }, { status: "404" })

        if (!file && !discription) return NextResponse.json({ message: "Invalid Post" })

        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto", // This allows uploading both images and videos
            folder: 'Jivalus_Posts', // Optional: Specify folder name in Cloudinary
        });

        // const res = await Post.create({ user: userId, file, discription, music }).catch((error) => { return error })
        // await User.findByIdAndUpdate({ _id: userId }, { $push: { posts: res._id } })

        return NextResponse.json({ message: "Post Created", uploadResponse }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 503 })
    }
}

