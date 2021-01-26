import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Book from '../components/Book'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Pagenate from '../components/Pagenate'
import { listBooks }  from '../actions/bookActions'


const HomeScreen = ({match}) =>
 {
     const keyword = match.params.keyword
     const pageNumber = match.params.pageNumber || 1
     const dispatch = useDispatch()

     const bookList = useSelector(state => state.bookList)
     const{ loading,error,books,page,pages } = bookList

    useEffect(()=>{
            dispatch(listBooks(keyword, pageNumber))    
        },[dispatch, keyword, pageNumber ])

  
    return (
        <>
         <h1>Latest Books</h1>
         {loading ? (
        <Loader></Loader>
         ) :  error ?(
         <Message variant='danger' > {error} </Message>
         ) : (
             <>
             <Row>
          {books.map((book)=> (
              <Col sm={12} md={6} lg={4} xl={3} key={book._id}>
                  <Book book = {book}/>
              </Col>
          ))}   
        </Row> 
            <Pagenate pages={pages} page={page} keyword={keyword ? keyword : ''}/> 
        </>
        )}  
        </> 
         
    )
}

export default HomeScreen