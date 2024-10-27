import { NextResponse } from "next/server";
import User from "../../../lib/models/user.model";


export async function POST(request) {
    try {
        const { search } = await request.json();

        const query = {
            $or: [
                { firstName: new RegExp(search, 'i') },
                { lastName: new RegExp(search, 'i') },
                { username: new RegExp(search, 'i') }
            ]
        };

        const users = await User.find(query);
        return NextResponse.json({ users })
    } catch (error) {
        return NextResponse.json({ error })
    }
}
