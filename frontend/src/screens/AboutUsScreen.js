import React from 'react'
import {Row,Table} from 'react-bootstrap'
const AboutUs = () => {
    return (
        <div>
          <Row>
              <h1>About Us</h1>
          </Row>
          <Row>
              <p>The Online Book Store Website provides customers with online shopping through a
             web browser. A customer can, create, sign in to his account, place items into a
             shopping cart and purchase.The Administrator will have additional functionalities when compared to the
            common user. He can add, delete and update the book details, book categories,
            member information and also confirm a placed order. </p>
            <p>This application is developed using JavaScript programming language.ReactJS
            is used for Client Side and State management is done using Redux.Where as NodeJs is
            used for server side. MongoDB(Atlas) and Mongoose(ODM) is used as Database Technology
            for Online Book Store</p>
             </Row>
          <Row>
              <h1>Our Team</h1>
          </Row>
          <Row>
           <Table striped bordered  hover responsive className='table-sm'>
           <thead>
                 <tr>
                     <th>SN</th>
                     <th>Roll No</th>
                     <th>Name</th>
                 </tr>
           </thead>
           <tbody>
               <tr>
                 <td>001</td>
                 <td>200250120020</td>
                 <td>Biswanath Bose</td>
               </tr>
               <tr>
                 <td>002</td>
                 <td>200250120024</td>
                 <td>Devesh Prakash Singh</td>
               </tr>
               <tr>
                 <td>003</td>
                 <td>200250120064</td>
                 <td>Piyush Kumar Singh</td>
               </tr>
               <tr>
                 <td>004</td>
                 <td>200250120072</td>
                 <td>Rahul Kumar</td>
               </tr>
               <tr>
                 <td>005</td>
                 <td>200250120075</td>
                 <td>Rao Ritesh Muralidhar</td>
               </tr>
           </tbody>
           </Table>   
          </Row>
        </div>
    )
}

export default AboutUs
