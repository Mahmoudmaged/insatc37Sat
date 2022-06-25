const express = require("express");
const router = express.Router()
const path = require('path')
const { auth } = require("../../middlwear/auth");
const validation = require("../../middlwear/validation");
const { myMulter, fileValdation, HME } = require("../../services/multer");
const profileController = require("./controller/profile");
const endPoint = require("./user.endPoint");
const validators = require("./user.validation")

router.use('/uploads', express.static(path.join(__dirname, '../../uploads')))

router.get("/profile", validation(validators.displayProfile), auth(endPoint.displayProfile), profileController.displayProfile)


router.patch("/profile/pic",
    myMulter('user/profile/pic', fileValdation.image).single('image'),
    auth(endPoint.displayProfile),
    profileController.profilePIc)


router.patch("/profile/covPic",
    myMulter('user/profile/covPic', fileValdation.image).array('image', 5), HME,
    auth(endPoint.displayProfile),
    profileController.coverPIC)


router.patch("/profile/password",
    validation(validators.forgetPassword),
    auth(endPoint.displayProfile),
    profileController.updatePassword)





module.exports = router;