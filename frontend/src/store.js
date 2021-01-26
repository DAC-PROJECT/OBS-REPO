import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import{ composeWithDevTools } from 'redux-devtools-extension'
import{ bookListReducer,
    bookDetailsReducer,
    bookDeleteReducer,
    bookCreateReducer,
    bookUpdateReducer,
    bookReviewReducer,} from './reducers/bookReducers'
import{cartReducer} from './reducers/cartReducers'
import{
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderMyListReducer,
    orderListReducer,
} from './reducers/orderReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer, 
    userUpdateReducer,
} 
from './reducers/userReducer'


const reducer = combineReducers({
    bookList:bookListReducer,
    bookDetails:bookDetailsReducer,
    bookDelete:bookDeleteReducer,
    bookCreate:bookCreateReducer,
    bookUpdate:bookUpdateReducer,
    bookCreateReview:bookReviewReducer,
    cart: cartReducer, 
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderMyList:orderMyListReducer,
    orderList:orderListReducer,
}) 

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage
    },
    userLogin:{
        userInfo:userInfoFromStorage
    },
} 

const middleware = [thunk]

const store =  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

