import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: String,
    likes: []
}, { timestamps: true }
)

var PostModel = mongoose.model("Posts", PostSchema)
export default PostModel;
