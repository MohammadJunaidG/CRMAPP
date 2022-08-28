const Notification = require("../models/notification.model");

exports.acceptNotificationRequest = async(req, res) => {

    try{
        const notifiacationObj = {
            subject : req.body.subject,
            recepientEmails: req.body.recepientEmails,
            content: req.body.content,
            requester: req.body.requester,
            status: req.body.status
        };
    
        const notifiacation = await Notification.create(notifiacationObj);
        res.status(201).send({
            message: "Request Accepted",
            trackingId: notifiacation._id
        });
    }catch(err){
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

/**
 * Controller to fetch the notification detailes based on the notification id.
 */
exports.getNotificationDetails = async (req, res) => {
    try{
        
        const notifiacation = await Notification.findOne({_id: req.params.id});

        res.status(200).send(notifiacation);
    }catch(err) {
        console.log("Error while retrieving the notification ", err.message);
        res.status(500).send({
            message: "Internal server error "
        });
    }
}