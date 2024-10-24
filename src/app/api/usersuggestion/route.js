
// suggestion to follow

import User from "../../../lib/models/user.model";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
export async function GET() {
    try {
        await connectDB()
        const suggestedUsers = await User.find({}).select("_id username firstName lastName profilePic")
        if (!suggestedUsers) return
        return NextResponse.json({ message: "", suggestedUsers, success: true }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 503 })
    }
}
