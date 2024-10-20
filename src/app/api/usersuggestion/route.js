
// suggestion to follow

import connectDB from "@/lib/db";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const suggestedUsers = await User.find({}).select("_id username firstName lastName profilePic")
        return NextResponse.json({ message: "", suggestedUsers, success: true }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 503 })
    }
}
