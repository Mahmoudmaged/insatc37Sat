const router = require("express").Router();
const { auth } = require("../../middlwear/auth");
const validation = require("../../middlwear/validation");
const { endPoint } = require("./auth.endPoint");
const validators = require("./auth.validation")
const rigstirationController = require("./controller/registration")


//signup
router.post("/signup", validation(validators.signup), rigstirationController.signup)
//refresh  email 
router.get('/refreshEmail/:id', rigstirationController.refreshEmail)
//confirm email
router.get("/confirmEmail/:token", validation(validators.confirmEmail), rigstirationController.confirmEmail)

//signin 
router.post("/login", validation(validators.login), rigstirationController.login)

router.patch("/logout",auth(endPoint.logout) ,rigstirationController.logOut)

//send forget code 
router.post("/sendCode", validation(validators.sendCode), rigstirationController.sendCode)
router.post("/forgetPassword", validation(validators.forgetPassword), rigstirationController.forgetPassword)











module.exports = router