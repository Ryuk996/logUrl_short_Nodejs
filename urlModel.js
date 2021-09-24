const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlLink: {
        type: String,
        required: [true, "Please enter URL!"]
        
    },
    shorturlLink: {
        type: String,
        required: [true, "Please enter URL!"],
        unique: true
        
    },
    clickCount: {
        type: Number,
        default:0
    }
}, {
    timestamps: true
})

// const Users = mongoose.model("Users", userSchema, 'accounts');
// module.exports = Users

module.exports = mongoose.model("Url", urlSchema, 'urllist');