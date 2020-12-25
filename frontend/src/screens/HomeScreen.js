import React,{useState,useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Book from '../components/Book'
import axios from 'axios'

export default function HomeScreen(props) {
   
    const [books,setBooks]=useState([])
     
    useEffect(()=>{
        const fetchBooks=async ()=>{
            const {data}=await axios.get('/api/books')
            setBooks(data)
        }

        fetchBooks()
    },[])
    return (
        <>
         <h1>Latest Books</h1>;
         <Row>
          {books.map((book)=> (
              <Col sm={12} md={6} lg={4} xl={3} key={book._id}>
                  <Book book = {book}/>
              </Col>
          ))}   
        </Row>   
        </>
    )
}
