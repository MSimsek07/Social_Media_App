import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";


// Yeni Kullanıcı Kaydı

export const registerUser = async (req, res) => {
    const { username, password2, password, firstname, lastname } = req.body;
    //password2 olanlar şifreleri unutmamak için girildi sonra heryerden silinebilir veya sifre kontrolü olarak kullanılabilir
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const newUser = new UserModel({ username, password2, password: hashedPass, firstname, lastname })

    try {
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Kullanıcı Girişi

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username: username })

        if (user) {
            const validity = await bcrypt.compare(password, user.password)

            validity ? res.status(200).json(user) : res.status(400).json("Wrong Password")
        }
        else {
            res.status(404).json("User Not Found")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}