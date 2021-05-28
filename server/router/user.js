const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.get('/', userController.findUser);
router.post('/add/:id', userController.addUser);
router.get('/test', (req,res)=>{
    res.status(200).json('API work')
});

module.exports = router;