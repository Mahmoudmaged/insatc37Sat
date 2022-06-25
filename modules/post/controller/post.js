const { populate } = require("../../../DB/model/comment");
const commentModel = require("../../../DB/model/comment");
const postModel = require("../../../DB/model/post");
const paginate = require("../../../services/paginate");


// const getAllPost = async (req, res) => {
//     const post = []
//     const cursor = postModel.find({}).cursor()
//     for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//         console.log(doc); // Prints documents one at a time
//         const comment = await commentModel.find({ postId: doc._id })
//         post.push({post:doc , comment})
//     }
//     res.status(200).json({ message: "Done" , post})
// }

const getAllPost = async (req, res) => {
    const { page, size } = req.query
    const { skip, limit } = paginate(page, size)
    const post = await postModel.find({}).limit(limit).skip(skip).populate([
        {
            path: 'createdBy',
            select: "userName  email"
        },
        {
            path: 'comments',
            match:{
                isDeleted:false
            },
            populate: [
                {
                    path: 'createdBy',
                    select: "userName  email"
                },
                {
                    path: 'likes',
                    select: "userName  email"
                },
                {
                    path: 'reply',
                    populate: [
                        {
                            path: 'createdBy',
                            select: "userName  email"
                        },
                        {
                            path: 'likes',
                            select: "userName  email"
                        },
                        {
                            path: 'reply',
                            populate: [
                                {
                                    path: 'createdBy',
                                    select: "userName  email"

                                },
                                {
                                    path: 'likes',
                                    select: "userName  email"
                                }
                            ]
                        }

                    ]
                }
            ]
        },
        {
            path: 'likes',
            select: "userName  email"
        }
    ])

    res.status(200).json({ message: "Done", post })
}

const createPost = async (req, res) => {
    const { text } = req.body
    if (req.fileErr) {
        res.status(400).json({ message: "in-valid format" })
    } else {
        const imageURL = [];
        req.files.forEach(file => {
            imageURL.push(`${req.finalDestination}/${file.filename}`)
        });
        const newPost = new postModel({ text, image: imageURL, createdBy: req.user._id })
        const savedPost = await newPost.save()
        res.status(201).json({ message: "Done", savedPost })
    }
}


const likePost = async (req, res) => {
    await postModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
}
const unLikePost = async (req, res) => {
    await postModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
}





module.exports = {
    createPost,
    getAllPost,
    likePost,
    unLikePost
}