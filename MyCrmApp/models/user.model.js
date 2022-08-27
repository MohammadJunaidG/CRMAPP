const mongoose = require("mongoose");
const constants = require("../utils/constants");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        minlength : 10
    },
    userType : {
        type: String,
        require : true,
        default : constants.userTypes.customer,
        enum : [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved,
        enum : [constants.userStatus.pending, constants.userStatus.approved]
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () =>{
            return Date.now()
        }
    },
    updatedAt : {
        type : Date,
        default : () =>{
            return Date.now()
        }
    },
    ticketsCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"        
    },
    ticketsAssigned : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"   
    }
})

module.exports = mongoose.model("user", UserSchema);