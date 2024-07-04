const db = require('../config/database')

const createUser = (username, password, callback) => {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?,?)')
    stmt.username([username, password], function(err){
        callback(err, this.lastID)
    })
}

const findUserByUsername = (username, callback) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        callback(err, row)
    })
}

module.exports = {createUser, findUserByUsername}