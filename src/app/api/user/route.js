
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/lib/models/user.model.js";
import { getDataFromToken } from "@/helpers/getDataToken";

export async function GET() {
    try {
        await connectDB();

        const userId = await getDataFromToken();
        console.log(userId);
        const user = await User.findOne({ _id: userId }).select("_id username profilePic firstName lastName");
        console.log(user);

        return NextResponse.json({ mesaaage: "User found", user, success: true }, { status: 200 })
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: error.message, error: true }, { status: 400 });
    }

}