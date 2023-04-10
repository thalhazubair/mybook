import React, {useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DueDate.css'
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import { getUserDetailsAPI } from '../../../Services/userServices';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom';


function DueDate() {
   const navigate = useNavigate()
   const [book, setBookData] = useState([])
   console.log(book);

  useEffect(() =>{
 
    getUserDetailsAPI() 
      .then((res) => {
        setBookData(res.data.doc.rentedBooks); 
        if(res.data.blocked){
          navigate('/')
          localStorage.removeItem('userToken');
          message.error(<span style={{color: 'black' }}>Sorry, You Have Been Blocked</span>)
        }
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
      
    <div className='recent'>
    <Container className='recent-book'>
    <Row className='duedate-card-read' style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'space-between' }}>
    {book.map((item, index)=>{
        let thumbnail = item.bookimage;
        return(
            <Col className='recent-pad recent-card-align' key={index}>
            <Card className='recent-main-card'>
                <div className='card-button-recent'> 

            <Card.Img variant="top" src={thumbnail} />
            

            <Card.Body className="duedate-body-container card-body-recent">
              <Card.Title>{item.bookName}</Card.Title>
              <Card.Text className='return-date'>Rented On : {item.rentedDate}</Card.Text>
              <Card.Text className='return-date'>Return On : {item.returnDate}</Card.Text>
            </Card.Body>
            </div>
      
          </Card>
          </Col>
        )
    })}
</Row>
</Container>
</div>
  )
}

export default DueDate