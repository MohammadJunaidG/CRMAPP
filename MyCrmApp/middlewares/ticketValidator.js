const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");

const isValidOwnerOfTheTicket = async (req, res, next) => {

    /**
     * Only admin, assigned engineer or owner should be allowd to update the ticket.
     * 
     * 1. find the user by using userId: req.userId which we got from token decoding load it in user const.
     * 2. find the ticket using _id : req.params.id where _id is given in ticket field and id we got from params.
     * 3. check if user.userType == customer. take ticket reporter into const ownerId.
     * 4. check if ownerId != user.userId then return response 401 message: 
     *    Only ADMIN | OWNER | ASIIGNED ENGINEER is allowed to update the ticket.
     * 5. If the first part not true then in else if part check if user.userType == engineer. 
     *    take ticket reporter into const ownerId. &
     *    take ticket assgnee into const engineerId.
     * 6. check if ownerId != user.userId && user.userId != engineedId then return response 401 message: 
     *    Only ADMIN | OWNER | ASIIGNED ENGINEER is allowed to update the ticket.
     */
    const user = await User.findOne({userId : req.userId});
    const ticket = await Ticket.findOne({_id : req.params.id});

    if(user.userType == constants.userTypes.customer){
        const ownerId = ticket.reporter;

        if(ownerId != user.userId){
            return res.status(401).send({
                message: "Only Admin | OWNER | ASSIGNED ENGINEER is allowed to update the ticket."
            })
        } else if(user.userType == constants.userTypes.engineer){
            const ownerId = ticket.reporter
            const engineerId = ticket.assignee;
           
            if(user.userId != ownerId  && user.userId != engineerId)
            return res.status(401).send({
                message: "Only Admin | OWNER | ASSIGNED ENGINEER is allowed."
            })
        }        
    }

    if(req.body.assignee != undefined && user.userType != constants.userTypes.admin){
        return res.status(403).send({
            message : " Only ADMIN is allowed to re-assign a ticket"
        })
    }

    if(req.body.assignee != undefined){
        const engineer = await User.findOne({userId: req.body.assignee})
        if(engineer == null){
            return res.status(403).send({
                message : " Engineer user Id passed as assigne is wrong."
            })
        }
    }
    next();
    
}

const validateTicket = {
    isValidOwnerOfTheTicket : isValidOwnerOfTheTicket
}

module.exports = validateTicket;

   
    /**
    * If the update requires the change in the assignee.
    * 
    *    1. Only ADMIN should be allowed to do this change
    *    2. Assignee should be a valid Engineer
     */

   




