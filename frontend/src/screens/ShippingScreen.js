import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const[address, setAddress] = useState(shippingAddress.address)
    const[city, setCity] = useState(shippingAddress.city)
    const[state, setState] = useState(shippingAddress.state)
    const[pinCode, setPinCode] = useState(shippingAddress.pinCode)
    const[country, setCountry] = useState(shippingAddress.country)
    const[phone, setPhone] = useState(shippingAddress.phone)
    

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,state,pinCode,country,phone}))
        history.push('/payment')
    }
    return (
        <FormContainer> 
        <CheckoutSteps step1 step2 />
        <h1> Shipping </h1>
        <Form onSubmit = {submitHandler}>
        <Form.Group controlId='address' >
               <Form.Label>Address</Form.Label>
               <Form.Control type='text'
                             placeholder='Enter address' 
                             value={address}
                             required 
                             onChange={(e)=>setAddress(e.target.value)}
               ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' >
               <Form.Label>City</Form.Label>
               <Form.Control type='text'
                             placeholder='Enter city' 
                             value={city}
                             required 
                             onChange={(e)=>setCity(e.target.value)}
               ></Form.Control>
        </Form.Group>
        <Form.Group controlId='state' >
               <Form.Label>State</Form.Label>
               <Form.Control type='text'
                             placeholder='Enter state' 
                             value={state}
                             required 
                             onChange={(e)=>setState(e.target.value)}
               ></Form.Control>
        </Form.Group>
          
        <Form.Group controlId='country' >
               <Form.Label>Country Name</Form.Label>
               <Form.Control type='text'
                             placeholder='Enter Country name' 
                             value={country}
                             required 
                             onChange={(e)=>setCountry(e.target.value)}
               ></Form.Control>
        </Form.Group>

        <Form.Group controlId='pinCode' >
               <Form.Label>Pin Code</Form.Label>
               <Form.Control type='text'
                             placeholder='Enter pin code' 
                             value={pinCode}
                             required 
                             onChange={(e)=>setPinCode(e.target.value)}
               ></Form.Control>
        </Form.Group>


        <Form.Group controlId='phone' >
               <Form.Label>Phone</Form.Label>
               <Form.Control type='tel'
                             placeholder='Enter phone' 
                             value={phone}
                             required 
                             onChange={(e)=>setPhone(e.target.value)}
               ></Form.Control>
        </Form.Group>

        <Button type='submit' variant = 'primary'>
            Continue..
        </Button>
        </Form>

        </FormContainer>
    )
}

export default ShippingScreen
