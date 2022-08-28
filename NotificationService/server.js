const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");


mongoose.connect(dbConfig.DB_URL, ()=>{
    console.log("Connected to MongoDB");
}, err => {
    console.log("DB connection failed som error ocurred", err.message);

})

/**
 * Stitch the router to server.js
 */
 require("./routes/notification.route")(app);

 /**
  * Attach the cron file also
  */
 require("./schedulers/emailScheduler");

app.listen(serverConfig.PORT, ()=>{
    console.log("Server started at port number: ", serverConfig.PORT)
})
