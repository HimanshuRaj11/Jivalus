import Comment from "../models/comment.model";
import Post from "../models/post.model";
import User from "../models/user.model";


export const GetPost = async ({ _id }) => {
    try {
        let getComments = [];
        const post = await Post.findById({ _id });
        const { user, comments, likes } = post;

        for (const comment_id of comments) {
            const element = await Comment.findOne({ _id: comment_id });
            if (element) {
                getComments.push(element);
            }
        }

        const userDetails = await User.findById({ _id: user }).select("_id username firstName lastName profilePic");

        const postData = { post, userDetails, commentLength: comments.length, likes: likes.length, getComments };

        return postData;
    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}