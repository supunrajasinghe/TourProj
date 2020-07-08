const PostSchema = require('../models/post');

const addPost = (req, res) => {
    let data = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.file.path,
    }
    console.log(data);
    PostSchema.create(data)
        .then((post) => {
            res.status(200).json(post);
        }).catch(err => {
            res.status(400).json(err);
        })
};

const getAllPosts = (req, res) => {
    PostSchema.find()
        .then((posts) => {
            res.status(200).json(posts);
        }).catch(err => {
            res.status(400).json(err);
        })
}

const getPost = (req, res) => {
    PostSchema.findById(req.params.id)
        .then((posts) => {
            res.status(200).json(posts);
        }).catch(err => {
            res.status(400).json(err);
        })
}

const updatePost = (req, res) => {
    let query = { _id: req.body.id }
    // PostSchema.findOneAndUpdate(query, {})
}

const deletePost = (req, res) => {
    PostSchema.findByIdAndDelete(req.params.id)
        .then((posts) => {
            res.status(200).json(posts);
        }).catch(err => {
            res.status(400).json(err);
        })
}

module.exports = {
    addPost,
    getAllPosts,
    getPost,
    deletePost,
    updatePost
};