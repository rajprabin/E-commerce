const mongoose = require('mongoose');
 
const deletedUserSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    role:{
        type:String
    },
    createdAt:{
        type:Date
    },
    deletedAt: {
        type:Date
    }
})


module.exports = mongoose.model('DeletedUser',deletedUserSchema)