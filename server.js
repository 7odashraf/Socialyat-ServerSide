import express from "express";
import connectDB from "./config/db.js"

const app= express();

connectDB();

app.get("/", (req,res)=> res.send("Server is working correctly"))

const PORT= process.env.PORT||5000;

app.listen(PORT,()=> console.log(`Server Has Started At PORT: ${PORT}`))
// app.use()
