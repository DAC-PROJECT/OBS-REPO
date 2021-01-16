//import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import React,{useState} from "react";
function App() {
const[BookId,setBookId]=useState(0);
const[BookPrice,setBookPrice]=useState(0);
const[BookName,setBookName]=useState("");
const addToList=()=>{
  Axios.post("http://localhost:9000/",{
    BookId:BookId,
    BookPrice:BookPrice,
    BookName:BookName,
  });
};

  return (
    <div className="App">
      <h1>CRUD Application with mern</h1>
       <label>Enter  Book_Id :</label>
       <input type="number"
       onChange={(event)=>{
        setBookId(event.target.value);

       }}
       
       
       />
       <label>EnterBook_Price :</label>
       <input type="number"
       onChange={(event)=>{
        setBookPrice(event.target.value);

       }}/>
      <label>EnterBook_Name :</label>
       <input type="text"
       onChange={(event)=>{
        setBookName(event.target.value);

       }}
       />
       <button onClick={addToList}>Add To List</button>
    </div>
  );
}

export default App;
