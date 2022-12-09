import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";

//Get User

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id)
        if (user) {
            //bu kısımda kullanıcı bilgilerini getirdiğimizde normalde şifre de görünüyor bunu engellemek için
            //alt satırdaki kodu kullandık _doc kullanıcının diğer bilgileri oluyor galiba
            const { password, password2, ...otherDetails } = user._doc
            res.status(200).json(otherDetails)
        }
        else {
            res.status(404).json("User Not Found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//Update User
export const updateUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, currentUserAdminStatus, password } = req.body
    if (id === currentUserId || currentUserAdminStatus) { // admin her türlü udpate yapabilir.
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("Access Denied!!! You can only update your own profile.")
    }
}

//Delete User

export const deleteUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, currentUserAdminStatus } = req.body;
    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("Access Denied!!! You can only delete your own profile.")
    }

}

//Follow User

export const followUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    if (currentUserId === id) { //Kendi Kendini Takip Edemez
        res.status(403).json("Action Forbidden!!!")
    }
    else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId);

            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { following: currentUserId } })
                await followingUser.updateOne({ $push: { followers: id } })
                res.status(200).json("User Followed!!!")
            }
            else {
                res.status(403).json("User Is Already Followed By You ")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

//UnFollow User

export const UnFollowUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    if (currentUserId === id) { //Kendi Kendini Takip Edemez
        res.status(403).json("Action Forbidden!!!")
    }
    else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId);

            if (followUser.following.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { following: currentUserId } })
                await followingUser.updateOne({ $pull: { followers: id } })
                res.status(200).json("User Unfollowed!!!")
            }
            else {
                res.status(403).json("User Is Not Followed By You ")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}
