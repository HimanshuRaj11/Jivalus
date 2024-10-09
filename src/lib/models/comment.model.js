import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Replies"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;