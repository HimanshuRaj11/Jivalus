import { getDataFromToken } from "@/helpers/getDataToken";
import cloudinary from "@/lib/cloudinary";
import User from "@/lib/models/user.model";
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

// {
//  asset_id: '93222cf306137036763bc108b223c276',
//   public_id: 'Jivalas_users_profile/jdejedluxhw4nm0fgviq',
//   version: 1729576747,
//   version_id: 'ead2c40f3e82f444471522674e1f75cc',
//   signature: 'f980b95e33f6a633ce8edcd9bca5e56fe28d74f9',
//   width: 2662,
//   height: 2133,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2024-10-22T05:59:07Z',
//   tags: [],
//   bytes: 352952,
//   type: 'upload',
//   etag: '8ecac9469a878e574894ea02e0d90dd8',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dsyzu3tej/image/upload/v1729576747/Jivalas_users_profile/jdejedluxhw4nm0fgviq.jpg',
//   secure_url: 'https://res.cloudinary.com/dsyzu3tej/image/upload/v1729576747/Jivalas_users_profile/jdejedluxhw4nm0fgviq.jpg',
//   folder: 'Jivalas_users_profile',
//   api_key: '459523946336646'
// }