import PostModel from "../Models/PostModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/UserModel.js";

//Create New Post

export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json("Post Created")
    } catch (error) {
        res.status(500).json(error)
    }
}

//Get Post

export const getPost = async (req, res) => {
    const id = req.params.id

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}
//Update Post

export const updatePost = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body

    try {
        const post = await PostModel.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("Post Updated")
        }
        else {
            res.status(403).json("Action Forbidden")
        }


    } catch (error) {
        res.status(500).json(error)

    }
}

//Delete Post

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post Deleted")

        }
        else {
            res.status(403).json("Action Forbidden")
        }


    } catch (error) {
        res.status(500).json(error)

    }
}

//Like And Unlike Post

export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id)
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post Likes")
        }
        else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("Post Unlikes")
        }


    } catch (error) {
        res.status(500).json(error)
    }
}

//Get Timeline Posts

export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const currentUserPosts = await PostModel.find({ userId: userId });
        const followingPosts = await UserModel.aggregate([  //aggrigate mongo ile iletişim kurmanın en karmaşık yoludur :D 
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId) //_id mongodaki id, userId ise programdaki id ve eşleştiriyor
                }
            },
            {
                $lookup: { // Bu da postları userId'leri ile birlikte followingPosts olarak bir dizide birleştiriyor
                    from: "posts",     //fakat sadece takip ettiklerinin postlarını alır kendi postlarını daha sonra birleştireceğiz
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project: { //Burası ise filtreleme yapıyor Id'leri almadan postlara erişimi sağlıyor
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts)
            .sort((a, b) => { //zamana göre sıralama tekniği
                return b.createdAt - a.createdAt;
            })
        );
        //kendi postları ile takip edilenlerin postlarını birleştiriyor
    } catch (error) {
        res.status(500).json(error)
    }
}