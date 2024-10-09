import mongoose from "mongoose";

const RepliesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    replies: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })

const Replies = mongoose.models.Replies || mongoose.model("Replies", RepliesSchema);
export default Replies;