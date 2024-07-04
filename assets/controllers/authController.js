const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const secret = 'your jwt secret'
function register(req, res) {
    const {username, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)

    User.createUser(username, hashedPassword, (error, userId) => {
        if(error){
            return res.status(500).send('Error registering user')
        }
        const token = jwt.sign({id: userId}, secret, {expiresIn: 86400})
        res.status(200).send({auth: true, token})
    })
}

function login (req, res){
    const {username, password} = req.body

    User.findUserByUsername(username, (error, user) => {
        if (error){
            return res.status(500).send("Internal server Error")
        }

        if (!user){
            return res.status(404).send("User not found")
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid){
            return res.status(401).send({auth: false, token: null})
        }

        const token = jwt.sign({id: user.id}, secret, {expiresIn: 86400})
        res.status(200).send({auth: true, token})
    })
}

function verifyToken(req, res, next){
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({auth: false, message: "No token provided"})
    }

    jwt.verify(token, secret, (error, decoded) => {
        if(error){
            res.status(500).send({auth: false, message: "Failed to authenticate"})
        }
        req.userId = decoded.id;
        next()
    })
}

module.exports = {register, login, verifyToken}