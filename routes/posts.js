const express = require('express');

const router = express.Router();

const postController = require('../controllers/post_controller');

router.get('/create', postController.create);

console.log("router at post running good");



module.exports = router;
