 import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails,payOrder, deliverOrder}from '../actions/orderActions' 
import { orderDetailsReducer } from '../reducers/orderReducers'
import {CART_REMOVE_ITEM} from '../constants/cartConstants'
import {   ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstants'


const OrderScreen = ({match,/*history*/}) => {

    const orderId=match.params.id
    const [payNow,setPayNow]=useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state)=>state.orderDetails)
    const{ order, loading, error} = orderDetails

    const orderPay = useSelector((state)=>state.orderPay)
    const{ loading:loadingPay, success:successPay} = orderPay
     
    const orderDeliver = useSelector((state)=>state.orderDeliver)
    const{ loading:loadingDeliver, success:successDeliver} = orderDeliver
     
    const userLogin = useSelector((state)=>state.userLogin)
    const{ userInfo} = userLogin
     
    if(!loading){
     const addDecimals = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
       }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item) =>
                     acc + item.price*item.qty,0))
    }
    useEffect(() => {
        // if(userInfo){
        //     history.push('/login')
        // }


          if (!order || successPay || successDeliver) {
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})

            dispatch(getOrderDetails(orderId))   
         }  
               
    }, [dispatch,orderId,successPay,successDeliver,order])

    const payNowHandler=()=>{
        if(!order.isPaid){
            setPayNow(true)
            dispatch(payOrder(order._id,order))
            dispatch({type:CART_REMOVE_ITEM})
        }
        
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:
    <>
    <h1>Order{order._id}</h1>
    <Row>
        <Col md={8}>
         <ListGroup variant='flush'>
          <ListGroup.Item>
           <h2>Shipping</h2>
           <p><strong>Name :</strong>{order.user.name}</p> 
          <p><strong>Email :</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
           <p><strong>Address:</strong>
           {order.shippingAddress.address},
           {order.shippingAddress.city},
            {order.shippingAddress.state},
           {order.shippingAddress.country},
           {order.shippingAddress.pinCode},</p>
           <p><strong>Phone :{order.shippingAddress.phone}</strong></p>
           {order.isDelivered ?( <Message variant='success'>Delivered on {order.deliveredAt}</Message>):(
           <Message variant='danger'>Not Delivered</Message>)}
         </ListGroup.Item>

         <ListGroup.Item>
           <h2>Payment Method</h2>
           <p><strong>Method:</strong>
           {order.paymentMethod}</p>
           {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>:
           <Message variant='danger'>Not Paid</Message>}
         </ListGroup.Item>

        <ListGroup.Item>
          <h2>Order Books</h2>
             { order.orderItems.length === 0 ? (
                 <Message>Order is empty</Message>) : (
                  <ListGroup variant = 'flush'>
                  {order.orderItems.map((item, index) => (
                 <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                    <Link to={`/product/${item.product}`}> {item.name}</Link>
                 </Col>
                  <Col md={4}> {item.qty} x {item.price} =  Rs.{item.qty * item.price} </Col>

             </Row>
         </ListGroup.Item>
        ))}
     </ListGroup> ) }
      </ListGroup.Item>
         </ListGroup>
         </Col>
          <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>Rs.{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>Rs.{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Taxes</Col>
                                <Col>Rs.{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>Rs.{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                         <ListGroup.Item>
                             {loadingPay && <Loader/>}
                             {!payNow &&
                              <Button type='button'
                              onClick={payNowHandler} className='btn-block'>Pay Now</Button>    
                             }
                         </ListGroup.Item>
                        )}
                        
                        {loadingDeliver && <Loader />}
                        {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                    Mark As Delivered
                                </Button>   
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
    </>
  }

export default OrderScreen