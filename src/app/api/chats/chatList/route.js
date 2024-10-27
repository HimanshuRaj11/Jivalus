import Chats from "../../../../lib/models/chats.model"
import { getDataFromToken } from "../../../../helpers/getDataToken";
import { NextResponse } from "next/server";
import User from "../../../../lib/models/user.model";

export async function GET(params) {

    try {
        const userId = await getDataFromToken();

        const chatsList = await Chats.find({
            users: { $in: userId }
        }).select("_id users");


        const filteredChatsList = chatsList.map(chat => {
            const user_Id = chat.users.find(user => user != userId)
            return {
                _id: chat._id,
                user: user_Id
            };
        });
        const Chatdetails = []
        for (const chats of filteredChatsList) {
            const userDetails = await User.findOne({ _id: chats.user }).select("username _id firstName lastName profilePic ")
            if (userDetails) {
                Chatdetails.push({
                    chat_id: chats._id,
                    user: userDetails
                })
            }
        }


        return NextResponse.json({ chatsList: Chatdetails });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 503 })
    }
}
