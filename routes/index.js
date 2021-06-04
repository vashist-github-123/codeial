const express =require('express');
//express is required only once, we have already called that before in index.js 

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

console.log("Routes Running");

module.exports = router;