
import connectDB from "../../../../lib/db";
import { NextResponse } from "next/server";
import User from "../../../../lib/models/user.model";
import { getDataFromToken } from "../../../../helpers/getDataToken";

export async function GET() {
    try {
        await connectDB();
        const userId = await getDataFromToken();
        if (!userId) return
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({ mesaaage: "User found", user, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, error: true }, { status: 400 });
    }

}