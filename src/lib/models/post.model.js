
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    file: [{
        type: String,
        required: true
    }],
    discription: {
        type: String,
    },
    location: {
        type: String,
    },
    colabWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    tags: [{
        type: String,
    }],
    tagPeople: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    music: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, { timestamps: true })

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)

export default Post;