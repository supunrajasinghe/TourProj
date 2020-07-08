const express = require('express');
const postController = require('../controllers/PostController');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);
router.post('/', upload.single('postImage'), postController.addPost);

router.put('/update', (req, res) => {
    console.log(req.body);
    res.json({ message: 'test' });
});

router.delete('/:id', postController.deletePost);

module.exports = router;
