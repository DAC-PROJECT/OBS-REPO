import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import paytm from 'paytm-nodejs'


//@desc Create new order 
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async(req,res)=>{

    const {
          orderItems, 
          shippingAddress,
          paymentMethod,
          itemsPrice, 
          taxPrice,
          shippingPrice, 
          totalPrice
        } = req.body

    if(orderItems && orderItems.length===0) {
        res.status(400)
        throw new Error('No books ordered')
        return
    } else {
        const order = new Order({
             orderItems, 
             user: req.user._id,
             shippingAddress, 
             paymentMethod,
             itemsPrice, 
             shippingPrice, 
             taxPrice,
             totalPrice,
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)    
    }

})



//@desc Get order by id
//@route POST /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async(req,res)=>{

        const order =await Order.findById(req.params.id).populate('user','name email')
        if (order) {
             res.json(order) 
        }  else {
            res.status(404)
            throw new Error('Order not found')
        }
})




//@desc update order to paid
//@route POST /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async(req,res)=>{

    const order =await Order.findById(req.params.id)
    if (order) {
         order.isPaid=true
         order.paidAt=Date.now()
         order.paymentResult={
             id:req.body._id,
             status:'completed',
             update_time:Date.now(),
             email_address:req.body.user.email
         } 
       const updatedOrder=await order.save()
       res.json(updatedOrder)

    }  else {
        res.status(404)
        throw new Error('Order not found')
    }
})


//@desc update order to delivered
//@route POST /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async(req,res)=>{

    const order =await Order.findById(req.params.id)
    if (order) {
         order.isDelivered=true
         order.deliveredAt=Date.now()
         
       const updatedOrder=await order.save()
       res.json(updatedOrder)

    }  else {
        res.status(404)
        throw new Error('Order not found')
    }
})


//@desc get logged users order
//@route POST /api/orders/myorders 
//@access Private
const getMyOrders= asyncHandler(async(req,res)=>{
     const orders =await Order.find({user:req.user._id})
      res.json(orders)  
})


//@desc Get all orders
//@route GET /api/orders 
//@access Private/Admin
const getOrders= asyncHandler(async(req,res)=>{
    const orders =await Order.find({}).populate('user','id name')
     res.json(orders)  
})

export{
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,  
}

