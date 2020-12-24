import React,{useState,useEffect} from 'react'
import {Link } from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const BookScreen = ({match}) => {
   const[book,setBook]=useState({})
   useEffect(()=>{
    const fetchBook=async ()=>{
        const {data}=await axios.get(`/api/books/${match.params.id}`)
        setBook(data)
    }
   fetchBook()
    },[])
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
             </Link>
             <Row>
                 <Col md={3}>
                 <Image src={book.image} alt={book.name}  />
                 </Col>
                 <Col md={5}>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h2>{book.name}</h2>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Rating value={book.rating} text={`${book.numReviews}reviews` } />
                      </ListGroup.Item>
                      <ListGroup.Item>
                     Price: ₹{book.price}
                      </ListGroup.Item>
                      <ListGroup.Item>
                     Description: {book.description}
                      </ListGroup.Item>
                  </ListGroup>
                 </Col>

                 <Col md={3} >
                     <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                              <Col>
                              Price : 
                              </Col>
                              <Col>
                             <strong>₹{book.price}</strong>
                              </Col>
                            </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                            <Row>
                              <Col>
                              Status: 
                              </Col>
                              <Col>
                             {book.countInStock>0?'In Stock':'Out Of Stock'}
                              </Col>
                            </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <Button className='btn-block' type='button'  disabled={book.countInStock===0}>
                           Add To Cart
                       </Button>
                   </ListGroup.Item>
                    </ListGroup>
                     </Card>
                 </Col>
             </Row>
        </>
    )
}

export default BookScreen
