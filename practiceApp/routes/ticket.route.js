const ticketController = require("../controllers/ticket.controller");
const authJwt = require("../middlewares/authJwt");


module.exports = (app) => {

    app.post("/crm/api/v1/tickets", [authJwt.verifyToken], ticketController.createTicket);

    app.get("/crm/api/v1/tickets", [authJwt.verifyToken], ticketController.finAllTickets);

    app.put("/crm/api/v1/tickets/:id", [authJwt.verifyToken, validateTicket.isValidOwnerOfTheTicket], 
    ticketController.updateTicket);

}