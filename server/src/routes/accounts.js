import express from "express";
import { client} from "../db.js";
const router = express.Router();
router.get("/",async(req,res)=>{
    try{
      const results= await client.query("SELECT * FROM account");
      res.send(results.rows);
    }catch(error){
      console.log("error disini bang messi : ", error);
    }
  })