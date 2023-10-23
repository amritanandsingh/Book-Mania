import React, { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom" ;
import {AiOutlineEdit  } from 'react-icons/ai' ;
import {MdOutlineAddBox , MdOutlineDelete  } from 'react-icons/md' ;
import { BsInfoCircle } from 'react-icons/bs';

const Home = () => {
    const [books , setBooks ] = useState([]);
    const [loading , setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true); 
        axios.get('http://localhost:5555/books')
        .then((response) => {
            setBooks(response.data.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false); 
        });
    }, []);
    
    return (
        <div className="p-4 m-4">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl my-8 text-center text-gray-800 font-bold">Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className="text-sky-800 text-4xl"/>
                </Link>
            </div>
            {loading ? (
                <Spinner/>
            ) : (
                <table className="w-full border border-collapse">
                    <thead>
                        <tr>
                            <th className="bg-slate-600 text-white font-semibold p-2">No</th>
                            <th className="bg-slate-600 text-white font-semibold p-2">Title</th>
                            <th className="bg-slate-600 text-white font-semibold p-2 hidden md:table-cell">Author</th>
                            <th className="bg-slate-600 text-white font-semibold p-2 hidden md:table-cell">Publish Year</th>
                            <th className="bg-slate-600 text-white font-semibold p-2">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id} className="h-12">
                                <td className="border text-center p-2">{index + 1}</td>
                                <td className="border text-center p-2">{book.title}</td>
                                <td className="border hidden md:table-cell text-center p-2">{book.author}</td>
                                <td className="border hidden md:table-cell text-center p-2">{book.publishYear}</td>
                                <td className="border text-center p-2">
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/books/details/${book._id}`} className="text-green-800 hover:underline">
                                            <BsInfoCircle className="text-2xl" />
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`} className="text-yellow-600 hover:underline">
                                            <AiOutlineEdit className="text-2xl" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Home;
