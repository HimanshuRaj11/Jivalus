import { getDataFromToken } from "../../../../helpers/getDataToken";
import cloudinary from "../../../../lib/cloudinary";
import Post from "../../../../lib/models/post.model";
import User from "../../../../lib/models/user.model";
import { NextResponse } from "next/server";

// create A Post
export async function POST(request) {
    try {
        const userId = await getDataFromToken(request);
        const { PostFiles, PostData } = await request.json();
        const { description, location } = PostData

        if (!PostFiles && !PostData) return NextResponse.json({ message: "Invalid Post" })
        if (!userId) return NextResponse.json({ message: "User Not found" }, { status: "404" })

        const uploadResponse = await Promise.all(PostFiles.map(file =>
            cloudinary.uploader.upload(file, {
                resource_type: "auto", // This allows uploading both images and videos
                folder: 'Jivalus_Posts', // Optional: Specify folder name in Cloudinary
            })
        ));

        await Post.create({
            user: userId,
            files: uploadResponse,
            description,
            location,
        }).then(async ({ data }) => {
            await User.findByIdAndUpdate({ _id: userId }, { $push: { posts: data._id } })
        }).catch((error) => { return error })

        return NextResponse.json({ message: "Post Created", uploadResponse, PostData }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 503 })
    }
}

