import express from 'express';
const router = express.Router();
import { Book } from '../models/bookModel.js';

router.get("/" , async(req,res) =>{
    try{
        const book =  await Book.find({});
        return res.status(200).json({
            count : book.length ,
            data:book
        });
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

router.get("/:id" , async(req,res) =>{
    try{
        const {id} = req.params;
        console.log(id);
        const book =  await Book.findById({_id:id});
        return res.status(200).json(book);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        //console.log("hello " , req.body);
        // Check if the required fields are provided and not empty
        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: "Please provide all required fields." });
        }

        const newBook = {
            title,
            author,
            publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: "An error occurred while creating the book." });
    }
});

router.put('/:id' , async(req,res) =>{
    try{
        const { title, author, publishYear } = req.body;
        // Check if the required fields are provided and not empty
        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: "Please provide all required fields." });  
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id , req.body);
        if(!result)
        {
            return res.status(404).json({message : "book not found"});
        }
        return res.status(200).send({message : "Book Update sucessfully"});
    }
    catch(error){
        console.log(error.message);
        res.status(500);
    }

});

router.delete("/:id" , async(req,res) =>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result)
        {
            return res.status(404).json({message : "Book Not Found"})
        }
        return res.status(200).send({message:"book delete successfully"}); 
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

export default router;