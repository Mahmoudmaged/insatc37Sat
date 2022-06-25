const commentModel = require("../../../DB/model/comment");
const postModel = require("../../../DB/model/post");



const createComment = async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    const { _id } = req.user

    const post = await postModel.findOne({ _id: id })
    if (!post) {
        res.status(404).json({ message: "In-valid post id" })
    } else {
        const createComment = new commentModel({ text, createdBy: _id, postId: post._id })
        const savedComment = await createComment.save()
        await postModel.findByIdAndUpdate(post._id, { $push: { comments: savedComment._id } })
        res.status(200).json({ message: "Done" })
    }
}


const replyOnComment = async (req, res) => {
    const { text } = req.body;
    const { id, commentID } = req.params;
    const { _id } = req.user

    const post = await postModel.findOne({ _id: id })
    if (!post) {
        res.status(404).json({ message: "In-valid post id" })
    } else {
        const comment = await commentModel.findOne({_id:commentID , postId:post._id})
        if (!comment) {
            res.status(404).json({ message: "In-valid comment id" })
        } else {
            const createComment = new commentModel({ text, createdBy: _id, postId: post._id })
            const savedComment = await createComment.save()
            await commentModel.findByIdAndUpdate(commentID, { $push: { reply: savedComment._id } })
            res.status(200).json({ message: "Done" })
        }
    }

}



const likeComment = async (req, res) => {
    await commentModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
}

const unLikeComment = async (req, res) => {
    await commentModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
}


module.exports = {
    createComment,
    replyOnComment,
    likeComment,
    unLikeComment
}