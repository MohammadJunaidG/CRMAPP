const authcontroller = require("../controllers/auth.controller")
const {verifySignUp} = require("../middlewares")

module.exports = (app) => {
    /**
     * POST for signUP
     */
    app.post("/crm/api/v1/auth/signup", verifySignUp.validateSignupRequestBody,  authcontroller.signUp)

    /**
     * POST for signIn
     */
    app.post("/crm/api/v1/auth/signin", verifySignUp.validateSignInRequestBody, authcontroller.signIn);
}