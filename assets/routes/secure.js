const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

router.get('protected', authController.verifyToken, (req, res) => {
    res.status(200).send("This is a protected route!")
})

module.exports = router