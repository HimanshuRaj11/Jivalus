import { NextResponse } from "next/server"
import { getDataFromToken } from "../../../../helpers/getDataToken";
import Chats from "../../../../lib/models/chats.model.js";
import connectDB from "../../../../lib/db";

export async function POST(request, response) {
    try {
        await connectDB()
        const { nextUser, sender, message } = await request.json();

        const userId = await getDataFromToken();

        const getChats = await Chats.findOne({
            users: { $all: [userId, nextUser] }
        })
        if (getChats) return NextResponse.json({ sent: false, error: "Already chat active" }, { status: 400 });


        if (!sender || !message || !userId || !nextUser) {
            return NextResponse.json({ sent: false, error: "Missing required fields" }, { status: 400 });
        }

        const users = [userId, nextUser];
        const chat = await Chats.create({
            users,
            messages: [{
                sender,
                message
            }]
        });

        return NextResponse.json({ sent: true, chat }, { status: 201 });

    } catch (error) {

        return NextResponse.json({ message: error.message }, { status: 503 });
    }
}