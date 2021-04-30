const express = require("express")
const router = express.Router()
const {verifyTokenAccess}= require("./../helper/verifyToken")

const {MoviesControllers} = require("./../controllers")
const {all} = MoviesControllers


router.get("/get/all", all)

module.exports = router