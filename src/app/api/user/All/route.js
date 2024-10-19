import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const AllUsers = await User.find()
        return NextResponse.json({ message: "Fetched", success: true, AllUsers }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error }, { status: 503 })
    }
}