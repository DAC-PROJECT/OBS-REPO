import React, { useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Book from '../components/Book'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Pagenate from '../components/Pagenate'
import BookCarousel from '../components/BookCarousel'
import { listBooks }  from '../actions/bookActions'
import {CART_ITEM_RESET} from '../constants/cartConstants'
import {ORDER_DETAILS_RESET,ORDER_CREATE_RESET} from '../constants/orderConstants'
import {BOOK_DETAILS_RESET} from '../constants/bookConstants'

const HomeScreen = ({match,location}) =>
 {
     const keyword = match.params.keyword
     const pageNumber = match.params.pageNumber || 1
     const dispatch = useDispatch()

     const bookList = useSelector(state => state.bookList)
     const{ loading,error,books,page,pages } = bookList

     const orderDetails = useSelector((state)=>state.orderDetails)
     const{ order} = orderDetails

     const cart  = useSelector( state => state.cart )
     const{ cartItems } = cart
     
    
   
    useEffect(()=>{
        if(order && cartItems) {
           // window.location.reload()
           dispatch({type:CART_ITEM_RESET})
           dispatch({type:ORDER_DETAILS_RESET})
           dispatch({type:ORDER_CREATE_RESET})
           dispatch({type:BOOK_DETAILS_RESET})
         }  
            dispatch(listBooks(keyword, pageNumber))    
        },[dispatch, keyword, pageNumber ,order,cartItems])

  
    return (
        <>
        {!keyword ? <BookCarousel/>:<Link to='/' className='btn btn-light'>Go Back</Link>}
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