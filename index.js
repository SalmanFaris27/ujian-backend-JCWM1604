const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()
const morgan = require ('morgan')
const bearerToken = require("express-bearer-token");
app.use(bearerToken());
const PORT = 2000
morgan.token("date",function (req,res){
    return new Date()
})


app.use(cors({exposedHeaders:["Content-Length", "x-token-access","x-token-refresh"]}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms:date'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))



app.get("/",(req,res)=>{
    res.send("<h1>welcome to API 1.O</h1>")
})

const {AuthRoutes} = require("./src/routes")
app.use("/user", AuthRoutes)

// const {moviesRoutes} = require("./src/routes")
// app.use("/movies", moviesRoutes)

app.all("*",(req,res)=>{
    res.status(404).send("server error")
})


app.listen(PORT, ()=> console.log("listen in port"+PORT))