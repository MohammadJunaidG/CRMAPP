/**
 * This file should have the logic to connect to the Notification Service
 */
 const Client = require("node-rest-client").Client;

 const client = new Client();; // This is the client object which will be used for calling the REST APIs


 /**
  * Exposing a method which takes the request parameters for sending the
  * notification request to the notification service
  */
 module.exports = (subject, content, recepients, requester) => {
 
     /**
      * Create the request body
      */
    const reqBody = {
        subject : subject,
        recepientEmail : recepients,
        content : content,
        requester : requester
    }
    /**
     * Prepare the header
     */
    const header ={
        "Content-Type" : "application/json" 
    }
    
    /**
     * Combine headers to request body togather
     */
    const args = {
        data : reqBody,
        headers: reqheader
    }

    /**
     * Make the POST call and handle the response.
     */
     try {
        client.post("http://localhost:8000/notiserv/api/v1/notifications", args, (data, res) => {

            console.log("Request sent");
            console.log(data);

        })
    } catch (err) {
        console.log(err.message);
    }
}