import express from 'express'
const router=express.Router()
import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  getOrders,
} 
from '../controllers/orderController.js'

import {protect, admin} from '../middleware/authMiddleWare.js'

router.route('/').post(protect, addOrderItems).get(protect,admin,getOrders)
router.route('/:id').get(protect, getOrderByID)
router.route('/myorders').get(protect, getMyOrders)
router.route('/myorders').get(protect, getMyOrders)

export default router