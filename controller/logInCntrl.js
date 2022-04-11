
const bcrypt = require('bcrypt')
const db = require('../mongo')
const jwt = require('jsonwebtoken')


const loginModule={

    // register new user

    async register (req , res){
        let {email , password} = req.body
        try{
            const data = await db.logIn.findOne({email});
            if (data){
                res.status(200).send({message : "Email already registered"})
            }else{
                const salt = await bcrypt.genSalt()
                password = await bcrypt.hash(password , salt)
                await db.logIn.insertOne({email , password})
                res.status(200).send({message:"user registered successfully"})
            }
        }catch(error){
            res.status(400).send({message: "something went wrong"})
        }
    },

    // user Login
    async userLogin(req , res){
        let {email , password} = req.body
        try{
            const user = await db.logIn.findOne({email})
            if(!user){
                res.status(200).send({message : "Enter valid EmailId"})
            }
            else{
                const isValid = await bcrypt.compare(password , user.password)
                if(isValid){
                    const authToken = jwt.sign({ email:user.email },
                         "admin123" , {expiresIn:"24h"})
                    res.status(200).send({authToken , message:"logged in successfully"})
                }else{
                    res.status(200).send({message:"Entered password is wrong"})
                }
            }
        }catch(error){
           res.status(400).send({message:"something went wrong"})
        }
    }
}

module.exports = loginModule ;