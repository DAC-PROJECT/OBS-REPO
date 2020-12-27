import React,{useState,useEffect} from 'react'
import {Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listBookDetails} from '../actions/bookActions'
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";



const BookScreen = ({history, match}) => {
const [qty, setQty] = useState(1)
    const dispatch=useDispatch()
    const bookDetails=useSelector(state=>state.bookDetails)
    const {loading,error, book}=bookDetails


   useEffect(()=>{
    dispatch(listBookDetails(match.params.id)) 
    },[dispatch,match])

    const addToCartHandler = () => {
            history.push('/cart/${match.params.id}?qty=${qty}')
    }
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
             </Link>
             {loading ? <Loader />: error? <Message variant='danger' >{error}</Message> : (
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

                   {book.countInStock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col> <Form.Control 
                            as='select' 
                            value={qty} 
                            onChange={(e) =>setQty(e.target.value)}>
                            {
                            [...Array(book.countInStock).keys()].map((x)=>(
                                <option key={x+1} value={x+1}> {x+1}</option>
                            )) }
                            </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                   )}
                   <ListGroup.Item>
                       <Button onClick={addToCartHandler}
                       className='btn-block' type='button'  disabled={book.countInStock===0}>
                           Add To Cart
                       </Button>
                   </ListGroup.Item>
                    </ListGroup>
                     </Card>
                 </Col>
             </Row>
         )}
     </>
    )
}

export default BookScreen
