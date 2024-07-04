const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
const user_Schema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    ]
})
user_Schema.plugin(plm);
module.exports = mongoose.model("user",user_Schema);