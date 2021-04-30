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
const insertId = Date.now()
const dba = promisify(mysqldb.query).bind(mysqldb)

module.exports={
    all:(req,res)=>{
        let sql = `select * from movies m join movie_status ms on m.id = ms.id`
        mysqldb.query(sql, (err, movi) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ message: "server error" });
            }
            return res.status(200).send(movi);
          });
    }
}