import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Recent.css";
import Container from "react-bootstrap/Container";
import { getUserDetailsAPI, getSoldBook, bidPaymentAPI, verifyBidPaymentAPI } from "../../../Services/userServices";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Review from "../Review/Review";
import useRazorpay from 'react-razorpay'
import { razorpayId } from '../../../Constance/Constance';

function Recent() {
  const Razorpay = useRazorpay();
  const [show, setShow] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [book, setBookData] = useState([]);
  const [sold, setSold] = useState([]);

  const navigate = useNavigate();

  const showModal = (title) => {
    setShow(true);
    setBookTitle(title);
  };

  useEffect(() => {
    getUserDetailsAPI().then((res) => {
      const data = res.data.doc
      const hasReturnedDate = data.rentedBooks.filter((book) => book.returnedDate)
      if(hasReturnedDate.length > 0){
        setBookData(hasReturnedDate)
      }
      if (res.data.blocked) {
        navigate("/");
        localStorage.removeItem("userToken");
        message.error(
          <span style={{ color: "black" }}>Sorry, You Have Been Blocked</span>
        );
      }
    });

    getSoldBook()
    .then((res)=> {
      if(res.data.success){
        console.log(res.data.doc);
        setSold(res.data.doc)
      }
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  const bidPayment = (price,title)=> {
    bidPaymentAPI({price:price})
    .then((res)=>{
      if (res.status === 200) {
        const options = {
          key: razorpayId,
          amount: (res.data.price)*100,
          currency: "INR", 
          name: "MyBook",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: res.data.order.id,
          handler: function (response) {
            verifyPayment(response, res.data, title);
          },
          prefill: {
            name: "MyBook",
            email: "mybook@gmail.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function () {
          message.error("payment failed");
          navigate("/profile");
        });

        rzp1.open();
      }
    })

  }

  const verifyPayment = (payment,details,title)=> {
    verifyBidPaymentAPI(payment,details,title)
    .then((response)=>{
      message.success(<span style={{color: 'black' }}>Payment Completed Succesfully</span>)
      navigate('/recent')
    })
  }

  return (
    
    <div className="recent">
<h2 class="font-weight-light px-4 pt-5">Recently Rented</h2>
      <Container className="recent-book">
        <Row
          className="recent-card-read"
          style={{
            display: "flex",
            flexWrap: "wrap", 
            justifyContent: "space-between",
          }}
        >
          {book.map((item, index) => {
            let thumbnail = item.bookimage
            return (
              <Col className="recent-pad recent-card-align" key={index}>
                <Card className="recent-main-card">
                  <div>
                    
                    <div className="card-button-recent">
                      <Card.Img variant="top" src={thumbnail} />

                      <Card.Body className="card-body-container card-body-recent">
                        <Card.Title>{item.bookName}</Card.Title>
                        
                        <Card.Text className="return-date">
                          Returned On : {item.rentedDate}
                        </Card.Text>
                        
                        <Card.Text className="return-date">
                          Returned On : {item.returnedDate}
                        </Card.Text>
                        
                      </Card.Body>
                    </div>

                    <Button variant="primary" onClick={() => showModal(item.bookName)}>
                      Add Review
                    </Button>
                  </div>
                </Card>
              </Col>
              
            )
          })}
        </Row>
      </Container>
      <h2 class="font-weight-light px-4 pt-3">Recently Bidded</h2>

      <Container className="recent-book">
        <Row
          className="recent-card-read"
          style={{
            display: "flex",
            flexWrap: "wrap", 
            justifyContent: "space-between",
          }}
        >
          {sold.map((item, index) => {
            let thumbnail = item.image[0].url
            return (
              <Col className="recent-pad recent-card-align" key={index}>
                <Card className="recent-main-card">
                  <div>
                    
                    <div className="card-button-recent">
                      <Card.Img variant="top" src={thumbnail} />

                      <Card.Body className="card-body-container card-body-recent">
                        <Card.Title>{item.title}</Card.Title>
                        
                        <Card.Text className="return-date">
                          Author : {item.author}
                        </Card.Text>
                        
                        <Card.Text className="return-date">
                          Bid Ended On : {item.enddate}
                        </Card.Text>

                        <Card.Text className="return-date">
                          Starting Bid : ${item.starting_bid_price}
                        </Card.Text>
                        
                        <Card.Text className="return-date">
                          Sold Price : ${item.current_bid_price}
                        </Card.Text>

                      </Card.Body>
                    </div>

                    {item.paid === false ? <Button variant="primary" onClick={()=>bidPayment(item.current_bid_price,item.title)}>
                      Pay Now
                    </Button> : <Button variant="primary" style={{backgroundColor:'green'}}>
                      Paid
                    </Button> }
                  </div>
                </Card>
              </Col>
              
            )
          })}
        </Row>
      </Container>

      <Review show={show} setShow={setShow} bookTitle={bookTitle}/>
    </div>
  );
}

export default Recent;
