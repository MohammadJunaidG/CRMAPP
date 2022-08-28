if(process.env.NOD_ENV =! "PRODUCTION"){
    require("dotenv").config();    
}

module.exports = {    
    PORT : process.env.PORT 
}
