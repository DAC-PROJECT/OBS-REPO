import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Book from '../components/Book'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBooks }  from '../actions/bookActions'

//import axios from 'axios'

export default function HomeScreen(props)
 {
     const dispatch = useDispatch()
     //const [books,setBooks] = useState([])
     const bookList = useSelector(state => state.bookList)

     const{ loading,error,books } = bookList

    useEffect(()=>{
            dispatch(listBooks())    
        // const fetchBooks=async ()=>{
        //     const {data}=await axios.get('/api/books')
        //     setBooks(data)
        // }

        // fetchBooks()
    },[dispatch])

  
    return (
        <>
         <h1>Latest Books</h1>;
         {loading ? (
         <Loader></Loader>
         ) :  error ?(
         <Message variant='danger' > {error} </Message>
         ) : (<Row>
          {books.map((book)=> (
              <Col sm={12} md={6} lg={4} xl={3} key={book._id}>
                  <Book book = {book}/>
              </Col>
          ))}   
        </Row> 
        )}  
        </> 
         
    )
}
