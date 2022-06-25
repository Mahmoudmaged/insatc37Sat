const userModel = require("../../../DB/model/User")
const bcrypt = require('bcryptjs')

const displayProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.status(200).json({ message: "Done", user })
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
}


const profilePIc = async (req, res) => {
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid format" })
        } else {
            const imageURL = `${req.finalDestination}/${req.file.filename}`
            const user = await userModel.findByIdAndUpdate(req.user._id, { profilePic: imageURL }, { new: true })
            res.status(200).json({ message: "Done" })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })

    }
}


const coverPIC = async (req, res) => {
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid format" })
        } else {
            const imageURL = [];
            req.files.forEach(file => {
                imageURL.push(`${req.finalDestination}/${file.filename}`)
            });
            const user = await userModel.findByIdAndUpdate(req.user._id, { coverPic: imageURL }, { new: true })
            res.status(200).json({ message: "Done", files: req.files })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })

    }
}


const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        if (oldPassword == newPassword) {
            res.status(409).json({ message: "sorry u have to make new one" })
        } else {
            const user = await userModel.findById(req.user._id);
            const match = await bcrypt.compare(oldPassword, user.password) //  T , F
            if (!match) {
                res.status(400).json({ message: "in-valid old password" })
            } else {
                const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRound))
                await userModel.findByIdAndUpdate(user._id, { password: hashPassword })
                res.status(200).json({ message: "Done" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }

}

module.exports = {
    displayProfile,
    profilePIc,
    coverPIC,
    updatePassword
}