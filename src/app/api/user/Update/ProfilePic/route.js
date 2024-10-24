import { getDataFromToken } from "../../../../../helpers/getDataToken";
import cloudinary from "../../../../../lib/cloudinary";
import User from "../../../../../lib/models/user.model";
import { NextResponse } from "next/server";




export async function POST(request) {
    try {
        const userId = await getDataFromToken();
        if (!userId) return
        const { ProfileImage } = await request.json()

        const user = await User.findOne({ _id: userId })
        const public_id = user?.profilePic?.public_id

        // Delete image
        if (public_id) {
            const deleteResponse = await cloudinary.uploader.destroy(public_id, {
                resource_type: "image",
            });
        }

        // Upload an image
        const uploadResponse = await cloudinary.uploader.upload(ProfileImage, {
            resource_type: "image",
            folder: 'Jivalas_users_profile',
        });
        // // Optimize delivery by resizing and applying auto-format and auto-quality
        // const optimizeUrl = cloudinary.url('Profile', {
        //     fetch_format: 'auto',
        //     quality: 'auto'
        // });

        // console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio

        // const autoCropUrl = cloudinary.url('Profile', {
        //     crop: 'auto',
        //     gravity: 'auto',
        //     width: 500,
        //     height: 500,
        // });

        // console.log(autoCropUrl);
        // if (!file) {
        //     return NextResponse.json({ error: "No files received." }, { status: 400 });
        // }
        // const buffer = Buffer.from(await file.arrayBuffer());
        // const filename = Date.now() + file.name.replaceAll(" ", "_");
        // console.log(filename);


        if (!uploadResponse) return
        await User.findOneAndUpdate({ _id: userId }, {
            profilePic: { public_id: uploadResponse.public_id, file: uploadResponse.url }
        })
        return NextResponse.json({ Message: "Success", uploadResponse }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    }
}
