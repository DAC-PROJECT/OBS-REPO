import React from 'react'
import {Route} from  'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container,NavDropdown,Image} from 'react-bootstrap'
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox'
import {CART_ITEM_RESET} from '../constants/cartConstants'

const Header = () => {
    
  const dispatch=useDispatch()
  
  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin


  
  const logoutHandler=()=>{
    dispatch({type:CART_ITEM_RESET})
    dispatch(logout())
  }

    return (
        <header>
            <Navbar bg="dark" variant = 'dark' expand="lg" collapseOnSelect>
                <Container>
                  <LinkContainer to='/'>
                    <Image src='/images/home.png' alt='home' id='home'></Image>
                  </LinkContainer>

  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Route render={({history}) => <SearchBox history={history} />}/>

    <Nav className="ml-auto">
      
    <LinkContainer to='/cart'>
     <Nav.Link >
        <i className='fas fa-shopping-cart'></i>Cart
      </Nav.Link> 
    </LinkContainer>

    {userInfo ?(
          <NavDropdown title={userInfo.name}  id='username'>
           <LinkContainer to='/profile'>
             <NavDropdown.Item>
               Profile
             </NavDropdown.Item>
           </LinkContainer>
           <LinkContainer to='/' >
             <NavDropdown.Item onClick={logoutHandler} > LogOut </NavDropdown.Item></LinkContainer>
           </NavDropdown>

    ) :( <LinkContainer to='/login'>
    <Nav.Link >
       <i className='fas fa-user'></i>Sign In
     </Nav.Link>
   </LinkContainer>
   )}
     {userInfo && userInfo.isAdmin && ( 
         <NavDropdown title='Menu'  id='adminmenu'>
         <LinkContainer to='/admin/userlist'>
           <NavDropdown.Item> Users</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to='/admin/booklist'>
           <NavDropdown.Item> Books</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to='/admin/orderlist'>
           <NavDropdown.Item> Orders</NavDropdown.Item>
         </LinkContainer>
        </NavDropdown>
     )}
      <LinkContainer to='/about'>
     <Nav.Link >
        <i className='fas fa-info' ></i> About Us 
      </Nav.Link> 
    </LinkContainer>

    </Nav>
   
  </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Header
