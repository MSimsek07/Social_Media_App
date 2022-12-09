import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        password2: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        followers: [], // takipçi ve takip edilenler için array
        following: []
        // eklemeler yapılabilir... Büyük ihtimal yapılacak :D
    },
    { timestamps: true }
)

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel