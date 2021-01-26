import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listBookDetails, updateBook} from '../actions/bookActions'
import { BOOK_UPDATE_RESET } from '../constants/bookConstants'


const BookEditScreen = ({match,history}) => {
  const bookId=match.params.id
  const[name,setName]=useState('')
  const[price,setPrice]=useState(0)
  const[image,setImage]=useState('')
  const[writer,setWriter]=useState('')
  const[genre,setGenre]=useState('')
  const[publication,setPublication]=useState('')
  const[countInStock,setCountInStock]=useState(0)
  const[description,setDescription]=useState('')

  const dispatch=useDispatch()

  const bookDetails=useSelector(state=>state.bookDetails)
  const{loading,error,book}=bookDetails

  const bookUpdate=useSelector(state=>state.bookUpdate)
  const{loading:loadingUpdate, error:errorUpdate, success:successUpdate}=bookUpdate

  useEffect(()=>{
         if(successUpdate){
             dispatch({type: BOOK_UPDATE_RESET})
             history.push('/admin/booklist')
         } else {
            if(!book.name || book._id !==bookId){
                dispatch(listBookDetails(bookId))
             }  else {
                 setName(book.name)
                 setPrice(book.price)
                 setImage(book.image)
                 setWriter(book.writer)
                 setGenre(book.genre)
                 setPublication(book.publication)
                 setDescription(book.description)
                 setCountInStock(book.countInStock)
             }
          }
        },
        
    [dispatch,history,bookId,book,successUpdate])


   const submitHandler=(e)=>{
       e.preventDefault()
      //Update Book
      dispatch(updateBook({
          _id: bookId,
          name,
          price,
          writer,
          genre,
          publication,
          description,
          image,
          countInStock,

      }))
      }
    return (
        <>
        <Link to='/admin/booklist' className='btn btn-light my-3'>
           Go Back 
        </Link>
        <FormContainer>
            <h1>Edit Book</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: 
            (
                <Form onSubmit={submitHandler} >
                <Form.Group controlId='name' >
                   <Form.Label>Name</Form.Label>
                   <Form.Control type='name'
                                 placeholder='Enter name'
                                 value={name}
                                 onChange={(e)=>setName(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price' >
                <Form.Label>
                      Book Price
                   </Form.Label> 
                   <Form.Control type='number'
                                 placeholder='Enter price'
                                 value={price}
                                 onChange={(e)=>setPrice(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image' >
                   <Form.Label>
                      Image
                   </Form.Label>
                   <Form.Control type='text'
                                 placeholder='Enter image url'
                                 value={image}
                                 onChange={(e)=>setImage(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='writer' >
                   <Form.Label>
                      Writer
                   </Form.Label>
                   <Form.Control type='text'
                                 placeholder='Enter writer name'
                                 value={writer}
                                 onChange={(e)=>setWriter(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='genre' >
                   <Form.Label>
                      Genre
                   </Form.Label>
                   <Form.Control type='text'
                                 placeholder='Enter the genre'
                                 value={genre}
                                 onChange={(e)=>setGenre(e.target.value)}
                   ></Form.Control>
                </Form.Group> 
    
                <Form.Group controlId='publication' >
                   <Form.Label>
                      Publication
                   </Form.Label>
                   <Form.Control type='text'
                                 placeholder='Enter publisher name'
                                 value={publication}
                                 onChange={(e)=>setPublication(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock' >
                <Form.Label>
                      Count in stock
                   </Form.Label> 
                   <Form.Control type='number'
                                 placeholder='Enter number of books available'
                                 value={countInStock}
                                 onChange={(e)=>setCountInStock(e.target.value)}
                   ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description' >
                   <Form.Label>
                      Description
                   </Form.Label>
                   <Form.Control type='text'
                                 placeholder='Description'
                                 value={publication}
                                 onChange={(e)=>setDescription(e.target.value)}
                   ></Form.Control>
                </Form.Group>
                
            <Button type='submit' variant='primary'>Update </Button>
              </Form>
            )}
          </FormContainer>
        </>
        )
}

export default BookEditScreen
