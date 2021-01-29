import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import BookListScreen from './screens/BookListScreen';
import BookEditScreen from './screens/BookEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import AboutUs from './screens/AboutUsScreen';
const App = () => {
  return (
   <Router>
   <Header/>
   <main className='py-3'>
     <Container>
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/about' component={AboutUs} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/placeOrder' component={PlaceOrderScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/book/:id' component={BookScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route path='/admin/booklist' component={BookListScreen} exact />
        <Route path='/admin/booklist/:pageNumber' component={BookListScreen} exact />
        <Route path='/admin/book/:id/edit' component={BookEditScreen} />
        <Route path='/admin/orderlist' component={OrderListScreen} />
        <Route path='/search/:keyword' component={HomeScreen} exact/>
        <Route path='/page/:pageNumber' component={HomeScreen} exact/>
        <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
        <Route path='/' component={HomeScreen} exact/>
      </Container>  
   </main>
   <Footer/> 
   </Router>
  );
}

export default App;
