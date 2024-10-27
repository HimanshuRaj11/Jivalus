import { NextResponse } from "next/server";
import User from "../../../lib/models/user.model";



export async function POST(request) {
    try {
        const { _id } = await request.json();
        const user = await User.findOne({ _id: _id });

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}