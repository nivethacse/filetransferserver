
const express = require ('express')
const db = require('./mongo')
const app = express()
const cors = require('cors')

const Port = 4000

const logInService = require("./routes/logInRoutes")

async function connection (){

    app.use(cors()) 

    app.use(express.json())

    await db.connect()

    app.use('/' , logInService)

    app.use((req , res , next)=>{
        const token = req.headers["auth-token"];
        if (token){
            try{
                req.user = jwt.verify(token , "admin123")
                next()
            }catch(error){
                res.sendStatus(500)
            }
        }else{
            res.sendStatus(400)
        }
    })
    
    app.listen(Port , ()=>{
        console.log("your server started at 4000")
    })
}

connection()