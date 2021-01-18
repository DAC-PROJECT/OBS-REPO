import React,{useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listBooks, deleteBook, createBook } from '../actions/bookActions'
import{BOOK_CREATE_RESET} from '../constants/bookConstants'
 
const BookListScreen = ({history, match}) => { 
       const dispatch=useDispatch()

       const bookList=useSelector(state=>state.bookList)
       const {loading,error,books}=bookList

       const bookDelete=useSelector(state=>state.bookDelete)
       const {loading: loadingDelete ,error: errorDelete, success: successDelete}=bookDelete

       const bookCreate=useSelector(state=>state.bookDelete)
       const {loading: loadingCreate,
        error: errorCreate, 
        success: successCreate,
        book: createdBook}=bookCreate

       const userLogin=useSelector(state=>state.userLogin)
       const {userInfo}=userLogin 

       useEffect(()=>{  
           dispatch({type:BOOK_CREATE_RESET})
           if(!userInfo.isAdmin){
            history.push('/login')  
           } 
           if(successCreate){
              // history.push(`/admin/book/${createdBook._id}/edit`)
           }else{
               dispatch(listBooks())
           }
           },[dispatch,history,userInfo, successDelete, successCreate, createdBook])

       const deleteHandler=(id)=>{
           if(window.confirm('Are you sure')){
            dispatch(deleteBook(id))
           }
           //dispatch(deleteBook(id))
           // delete books
       }

    const createBookHandler = () => {
           // create books
           dispatch(createBook())
       }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    Books
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createBookHandler}>
                        <i className='fas fa-plus' ></i>Create Book
                    </Button>
                </Col>
            </Row>    

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

           {loading ?<Loader /> : error ? <Message variant='danger'>{error}</Message>
           :(
               <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Genre</th>
                <th>Publication</th>
                <th></th>
                </tr> 
                </thead>
                <tbody>
                    {books.map(book=>(
                        <tr key={book._id}>
                         <td>{book._id}</td>
                         <td>{book.name}</td>
                         <td>Rs.{book.price}</td>
                         <td>{book.genre}</td>
                         <td>{book.publication}</td>
                         <td>
                             <LinkContainer to={`/admin/book/${book._id}/edit`}>
                                 <Button variant='light' className='btn-sm'>
                                   <i className='fas fa-edit'></i>
                                 </Button>
                             </LinkContainer>
                           <Button variant='danger' className='btn-sm' onClick={()=>
                           deleteHandler(book._id)} >
                               <i className='fas fa-trash'></i>
                           </Button>
                         </td>
                        </tr>
                    ))}
                </tbody>
               </Table>
           )}
        </>
    )
}

export default BookListScreen
