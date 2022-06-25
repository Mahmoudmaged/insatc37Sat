const { auth } = require("../../middlwear/auth");
const { myMulter, fileValdation } = require("../../services/multer");
const { endPoint } = require("./post.endPoint");
const postController = require("./controller/post");
const commentController = require("./controller/comment")
const validation = require("../../middlwear/validation");
const validators = require("./post.validation")
const router = require("express").Router();

router.get("/",
    postController.getAllPost)
router.post("/",
    auth(endPoint.createPost),
    myMulter('/post', fileValdation.image).array('image', 5),
    validation(validators.createPost),
    postController.createPost)

router.patch("/:id/comment",
    auth(endPoint.createPost),
    validation(validators.createComment),
    commentController.createComment)

router.patch("/:id/like",
    auth(endPoint.createPost),
    validation(validators.likePost),
    postController.likePost)
    
router.patch("/:id/unlike",
    auth(endPoint.createPost),
    validation(validators.likePost),
    postController.unLikePost)

router.patch("/:id/comment/:commentID/reply",
auth(endPoint.createPost),
validation(validators.replyOnComment),
commentController.replyOnComment )

router.patch("/comment/:id/like",
    auth(endPoint.createPost),
    validation(validators.likePost),
    commentController.likeComment)

router.patch("/comment/:id/unlike",
    auth(endPoint.createPost),
    validation(validators.likePost),
    commentController.unLikeComment)



module.exports = router