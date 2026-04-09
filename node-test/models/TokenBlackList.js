const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const BlackListSchema = new mongoose.Schema({
    token: String,
    expiresAt: Date
},{
    timestamps:true
})

module.exports = mongoose.model("TokenBlackList",BlackListSchema)