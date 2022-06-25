const Joi = require("joi")
const createPost = {

    body: Joi.object().required().keys({
        text: Joi.string()
    })
}


const createComment = {

    body: Joi.object().required().keys({
        text: Joi.string().required(),
    
    }),
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}

const likePost = {

    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}


const replyOnComment = {
    body: Joi.object().required().keys({
        text: Joi.string().required(),
    
    }),
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required(),
        commentID:Joi.string().min(24).max(24).required(),
    })
}


const replyOnReplyOnComment = {
    body: Joi.object().required().keys({
        text: Joi.string().required(),
    
    }),
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required(),
        commentID:Joi.string().min(24).max(24).required(),
        replyID:Joi.string().min(24).max(24).required(),
    })
}





module.exports = {
    createPost,
    createComment,
    likePost,
    replyOnComment,
    replyOnReplyOnComment
}