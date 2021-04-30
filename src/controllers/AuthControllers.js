const {mysqldb} = require ("./../connections")
const {
    createAccessToken,
    createTokenRefresh
}= require ("./../helper/createToken")
const hashpass = require("./../helper/hashingpass")
const { v4: uuidv4 } = require('uuid')
const { promisify } = require("util")
const { query } = require("../connections/mysqldb")
const { error } = require("winston")
const dba = promisify(mysqldb.query).bind(mysqldb)
module.exports={
    Register: async(req,res)=>{
        try {
            const {username,email,password} = req.body
            if(!username || !password){
                return res.status(400).send({message:"bad request"})
            }
            if(!username.match(/^(?=.{6,100})/)){
                return res.status(400).send({message:"tidak sesuai syarat"})
            }
            if(!password.match(/^(?=.*[0-9])(?=.{6,100})/)){
                return res.status(400).send({message:"tidak sesuai syarat"})
            }
            if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                return res.status(400).send({message:"tidak sesuai emailt"})
            }
            let sql = `select * from users where username = ?`
            const datausers = await dba (sql,[username])
            if (datausers.length){
                return res.status(500).send({message:"username telah terdaftar"})

            }else{

                sql = `insert into users set ?`
                const iduser = insertId
                const uiduser = Date.now()
                let data = {
                    uid : uiduser,
                    username : username,
                    password : hashpass(password),
                    email:email
                }
                await dba(sql,data)
                sql = `select id,uid,username,email,password,role,status from users where id = ?`
                const datauser = await dba(sql,[iduser])
                let dataToken = {
                    iduser: datauser[0].iduser,
                    username: datauser[0].username
                }
                const tokenAccess = createAccessToken (dataToken)
                const tokenRefesh = createTokenRefresh (dataToken)

                res.set("x-token-Access", tokenAccess)
                res.set("x-token-Refresh",tokenRefesh)

                res.status(200).send(datauser[0])
            }
            
        } catch (error) {
            return res.status(500).send({message:"server error"})
        }

    },
    login: async(req,res)=>{
        try {
            const {usernameoremail, password} = req.body
            if (!usernameoremail || !password){
                return res.status(400).send({message:"bad request"})

            }
            let sql = `select id, username, email, role, status from users where (username = ? or email = ?) and password = ?`
            const datauser = await dba (sql,[username,hashpass(password)])
            if (datauser.length){
                let dataToken = {
                    idusers: datauser[0].id,
                    username: datauser[0].username
                }
                const tokenAccess = createAccessToken(dataToken)
                const tokenRefresh = createTokenRefresh (dataToken)
                res.set("x-token-access", tokenAccess)
                res.set("x-token-refresh", tokenRefresh)

                res.status(200).send(datauser[0])
            }else{
                return res.status(500).send("username tidak ditemukan")
            }

        } catch (error) {
            return res.status(500).send({message:"server error"})
        }
    },

}