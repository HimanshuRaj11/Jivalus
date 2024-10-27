import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    sent: {
        type: Boolean,
        default: false,
        required: true,
    },
    seen: {
        type: Boolean,
        default: false,
        required: true,
    }
}, { timestamps: true });
const ChatsSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [MessageSchema],
}, { timestamps: true });

const Chats = mongoose.models.Chats || mongoose.model("Chats", ChatsSchema);
export default Chats;
