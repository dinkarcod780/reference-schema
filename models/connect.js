const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db is badhiya"))
.catch((error)=>console.log(error));