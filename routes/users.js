import express from "express";
import config from "config"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {check,validationResult} from "express-validator"
import User from "../models/Users.js"

const router = express.Router();

router.post("/",
            check("name","Name Is Required").notEmpty().matches(/^[0-9A-Za-z]{6,16}$/),
            check("email","Email Not Valid").isEmail(),
            check("password","Password Not Valid").matches(/^[0-9A-Za-z]{6,16}$/),
            async (req,res)=> {
                const errors= validationResult(req);
                if (!errors.isEmpty())
                    return res.status(400).json({err: errors.array()})
                const {name,email,password}=req.body;
                // res.send("Success,API Valid")
                try{
                    let user= await User.findOne({email})
                    if(user){
                        res.status(400).json({errors: [{msg:"user already exists"}]});
                    }
                    user=new User({
                        name,email,password
                    });
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(password,salt);
                    await user.save();
                    
                    const payload={
                        user:{
                            id: user.id
                        }
                    }
                    // get(user.id)
                    jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"5 days"},(err,token)=>{
                        if (err)
                            return err;
                        res.json({token})
                    })    
                }catch(err){
                    console.error(err.message);
                    res.status(500).send("Failed");
                }
});

export default router;