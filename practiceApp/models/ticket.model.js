const mongoose = require("mongoose");
const constants = require("../utils/constants")

const ticketSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    ticketPriority : {
        type : Number,
        requires: true,
        default: 4
    },
    description: {
        type: String,
        required : true
    },
    status : {
        type: String,
        required: true,
        default: constants.ticketStatus.open,
        enum : [constants.ticketStatus.close, constants.ticketStatus.blocked, constants.ticketStatus.open]
    },
    reporter : {
        type : String,
        requied : true
    },
    assignee : {
        type: String,
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
    }   
}, {versionKey : false})

module.exports = mongoose.model("Ticket", ticketSchema);