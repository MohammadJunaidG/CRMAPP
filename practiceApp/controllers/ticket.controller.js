const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const constants = require("../utils/constants")

exports.createTicket = async (req, res) => {
    try {
        const ticketObj = {
            title: req.body.title,
            description: req.body.description,
            ticketPriority: req.body.ticketPriority,
            status: req.body.status,
            reporter: req.userId
        }
        const engineer = await User.findOne({
            userType: constants.userTypes.engineer,
            userStatus: constants.userStatus.approved
        })
        if (engineer) {
            ticketObj.assignee = engineer.userId
        }

        const ticketCreated = await Ticket.create(ticketObj);

        if (ticketCreated) {
            const customer = await User.findOne({
                userId: req.userId
            })
            customer.ticketsCreated.push(ticketCreated._id);
            await customer.save();

            if (engineer) {
                engineer.ticketsAssigned.push(ticketCreated._id);
                await engineer.save();
            }
            res.status(201).send(ticketCreated);
        }
    } catch (err) {
        console.log("Error while doing the DB operations ", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.finAllTickets = async (req, res) => {
    
    const user = await User.findOne({ userId: req.userId })
    const queryObj = {};
    const ticketsCreated = user.ticketsCreated;
    const ticketsAssigned = user.ticketsAssigned;

    if (user.userType == constants.userTypes.customer) {
        if (!ticketsCreated) {
            return res.status(200).send({
                message : "No tickets created yet."
            })
        }
        //Query object for fetching all the tickets created by the user
        queryObj["_id"] = { $in: ticketsCreated };
    } else if (user.userType == constants.userTypes.engineer) {
        //Query object for fetching all the tickets assigned/created to a engineer/user.
        queryObj["$or"] = [{ "_id": {$in: ticketsCreated } }, { "_id": {$in: ticketsAssigned } }]
    }
    const tickets = await Ticket.find(queryObj);
    
    res.status(200).send(tickets);
}

exports.updateTicket = async (req, res) => {

    try{
        const ticket = await Ticket.findOne({"_id" : req.params.id});

        ticket.title = req.body.title != undefined ? req.body.title : ticket.title,
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description,
        ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority,
        ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee,
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status
    
        const updatedTicket = await ticket.save();
    
        res.status(200).send(updatedTicket);   

    } catch (err) {
        console.log("Some error while updating ticket ", err.message);
        res.status(500).send({
            message: "Some internal error while updating the ticket"
        })
    }
}
