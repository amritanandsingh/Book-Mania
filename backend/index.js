import express from "express";
import mongoose from "mongoose";

import { PORT , mongoDBURL} from "./config.js";

const app = express();

app.get("/" , (req,res)=>{
    console.log(req);

    return res.status(234).send("Welcome is MERN Stack Tutorial");
});




mongoose.connect(mongoDBURL).then(()=>{
    console.log("App is connected to DB ");
    
    app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`);
    });
    
    }).catch((error) =>{
        console.log(error)});