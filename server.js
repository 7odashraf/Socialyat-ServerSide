import express from "express";
import connectDB from "./config/db.js";
import profiles from "./routes/profiles.js";
import users from "./routes/users.js";
import posts from "./routes/posts.js";

const app= express();

app.use(express.json());

app.use("/api/profiles",profiles);
app.use("/api/users",users);
app.use("/api/posts",posts);

connectDB();

app.get("/", (req,res)=> res.send("Server is working correctly"))

const PORT= process.env.PORT||5000;

app.listen(PORT,()=> console.log(`Server Has Started At PORT: ${PORT}`));
