import express, { response } from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { PORT , mongoDBURL} from "./config.js";
import booksRouter from "./routes/booksRouts.js";
import cors from 'cors' ;

const app = express();

//app.use(express.urlencoded());
app.use(express.json());

app.use(cors());

app.get("/" , (req,res)=>{
    console.log(req);
    return res.status(234).send("Welcome is MERN Stack Tutorial");
});

app.use("/books", booksRouter);



mongoose.connect(mongoDBURL).then(()=>{
    console.log("App is connected to DB ");
    
    app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`);
    });
    
    }).catch((error) =>{
        console.log(error)});