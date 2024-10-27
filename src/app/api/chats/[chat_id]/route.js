import Chats from "../../../../lib/models/chats.model.js";
import { NextResponse } from "next/server";
export async function POST(request, { params: { chat_id } }) {
    try {
        const { sender, message } = await request.json();

        const chat = await Chats.findOneAndUpdate(
            {
                _id: chat_id,
                users: { $in: [sender] }
            },
            {
                $push: {
                    messages: {
                        sender,
                        message
                    }
                }
            },
            { new: true }
        );


        return NextResponse.json({ sent: true, message }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 503 });
    }
}

export async function GET(request, { params: { chat_id } }) {
    try {
        const chat = await Chats.findOne({ _id: chat_id }).select("messages");
        return NextResponse.json({ sent: true, chat }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 503 });
    }
}