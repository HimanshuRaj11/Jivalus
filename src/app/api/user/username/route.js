import { NextResponse } from "next/server";
import User from "@/lib/models/user.model.js";
import connectDB from "@/lib/db";

export async function POST(request) {
    try {
        await connectDB();
        const Reqdata = await request.json()
        const { username } = Reqdata

        const user = await User.findOne({ username })
        return user ? NextResponse.json({ error: true }, { status: 200 }) : NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, error: true }, { status: 400 });
    }

}