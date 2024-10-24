
import mongoose from "mongoose";
const file = {
    asset_id: { type: String, },
    public_id: { type: String, },
    version: { type: Number, },
    version_id: { type: String, },
    signature: { type: String, },
    width: { type: Number },
    height: { type: Number, },
    format: { type: String, },
    resource_type: { type: String, },
    created_at: { type: String, },
    bytes: { type: Number, },
    type: { type: String, },
    etag: { type: String, },
    placeholder: { type: Boolean, },
    url: { type: String, },
    secure_url: { type: String, },
    folder: { type: String, },
    api_key: { type: String, },
}

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    files: [file],
    description: {
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


