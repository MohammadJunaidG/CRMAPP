/**
 * This file is for the sample code for sending
 * email notification.
 */

const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    port : 465,
    service: "gmail",
    auth : {
        user : "mjunaid2789@gmail.com",
        pass: 'xthotdesoaviqlaq'
    },
    secure: true,
})
