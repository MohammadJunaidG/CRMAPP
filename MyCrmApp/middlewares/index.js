const verifySignUp = require("./verifySignUp");
const authJwt = require("./authJwt");
const validateTicket = require("./ticketValidator");

module.exports = {
    verifySignUp,
    authJwt, 
    validateTicket
}