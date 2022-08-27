const express = require("express");
const app = express();
const serverConfig = require("./configs/server.config")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config")
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("err", () => {
    console.log("Error while connecting with MongoDB")
});
db.once("open", ()=>{
    console.log("Connected with MongoDB")
    init();
})

async function init (){

    try{

        await User.collection.drop();

        const user = await User.create({
            name : "Mohammad",
            userId: "admin",
            password : bcrypt.hashSync("junaid", 8),
            email : "mojunaid2050@gmail.com",
            userType : "ADMIN",
            userStatus : "APPROVED"
        })

    console.log(user);

    }catch(err){
        console.log("Error in DB initilization", err.message)
    }
}

require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/ticket.route")(app);

app.listen(serverConfig.PORT, ()=>{
    console.log("Server has started on port number: ", serverConfig.PORT)
})