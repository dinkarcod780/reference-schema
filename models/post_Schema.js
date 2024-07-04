const mongoose = require("mongoose")
const post_Schema = mongoose.Schema({
    caption:String,
    title:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})
module.exports = mongoose.model("post",post_Schema);