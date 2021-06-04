const express =require('express');
//express is required only once, we have already called that before in index.js 

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

// for any further routes, access from here
//router.use('/routerName', require('./routerFile))

console.log("Routes Running");

module.exports = router;