import express from "express";

const router = express.Router();
router.get("/",(req,res)=> res.send("posts route"));

export default router;