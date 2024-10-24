import { NextResponse } from "next/server";
import User from "../../../../lib/models/user.model";
import connectDB from "../../../../lib/db";

export async function GET(request, { params: { username } }) {
    try {
        await connectDB();
        const user = await User.findOne({ username })
        if (!user) return
        return NextResponse.json({ user, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, error: true }, { status: 400 });
    }

}