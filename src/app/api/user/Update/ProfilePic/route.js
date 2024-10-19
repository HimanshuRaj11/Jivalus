import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';



export async function POST(request) {
    try {


        cloudinary.config({
            cloud_name: 'dsyzu3tej',
            api_key: '459523946336646',
            api_secret: process.env.CLOUDAINARY_SECRET_KEY,
            secure: true,
        });
        const formData = await request.formData();
        const file = formData.get("Profile");
        console.log(file);

        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
            public_id: 'Profile',
        }
        )
            .catch((error) => {
                console.log(error);
            });

        console.log(uploadResult);
        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url('Profile', {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url('Profile', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        console.log(autoCropUrl);
        // if (!file) {
        //     return NextResponse.json({ error: "No files received." }, { status: 400 });
        // }
        // const buffer = Buffer.from(await file.arrayBuffer());
        // const filename = Date.now() + file.name.replaceAll(" ", "_");
        // console.log(filename);

        return NextResponse.json({ Message: "Success", status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    }
}