const express = require("express")
const router = express.Router()
const {verifyTokenAccess}= require("../helper/verifyToken")

const {AuthControllers} = require("../controllers")
const {Register,login} = AuthControllers


router.post("/register", Register)
router.post("/login",verifyTokenAccess, login)

module.exports = router