const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");

exports.isValidOwnerOfTheTicket = async (req, res, next) => {

    const user = await User.findOne({userId : req.userId});
    const ticket = await Ticket.findOne({_id : req.params.id});

    if(user.userType == constants.userTypes.customer){
        const ownerId = ticket.reporter;

        if(ownerId != user.userId){
            return res.status(403).send({
                message: "Only admin | owner | assigner engineer is allowed."
            })
        }
    } else if (user.userType == constants.userTypes.engineer){
        const ownerId = ticket.reporter;
        const engineerId = ticket.assignee;

        if(ownerId != user.userId && user.userId != engineerId){
            return res.status(403).send({
                message: "Only admin | owner | assigner engineer is allowed."
            })
        }
    }
}