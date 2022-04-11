
const route = require('express').Router()
const logInServices = require("../controller/logInCntrl")

route.post("/register" , logInServices.register)
route.post("/login" , logInServices.userLogin)

module.exports = route ; 