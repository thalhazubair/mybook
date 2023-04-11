import React, { useState, useEffect } from "react";
import "./market.css";
import { Link } from "react-router-dom";
import { getAuctionBookListAPI,getUserDetailsAPI  } from '../../../Services/userServices'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom';

function Market() {

  const [bookData, setBookData] = useState([])
  const [Upcoming, setUpcoming] = useState([])
  const navigate = useNavigate()

  useEffect(() =>{

    getUserDetailsAPI() 
    .then((res) => {
      if(res.data.blocked){
        navigate('/')
        localStorage.removeItem('userToken');
        message.error(<span style={{color: 'black' }}>Sorry, You Have Been Blocked</span>)
      }
    })

    getAuctionBookListAPI()
    .then((res)=>{
      setBookData(res.data.doc)
      setUpcoming(res.data.inactiveBooks)
    })
    .catch(err=>console.log(err))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 
  return (
    <>
    <h1>
          <span className='main-market-bid'>Ongoing Bid</span>
        </h1>

        <div className="market-center">
          <div className="book-container-list-market">
            {bookData.map((item, index) => {
              
              let thumbnail = item.image[0].url; 
              console.log(thumbnail);
              return (
                <div key={index} className="book-container-market">
                  <div
                    className="book-image"
          
                  >
                    <img src={thumbnail} alt="" />
                  </div>

                  <div className="book-content">
                  <Link to="/bid" state={{ book: item }}>
                    <button className="market-bid-button">BID</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <h1>
          <span className='main-market-bid'>Upcoming Bids</span>
        </h1>

        <div className="market-center">
          <div className="book-container-list-market">
            {Upcoming.map((item, index) => {
              let thumbnail = item.image[0].url; 
              return (
                <div key={index} className="book-container-market">
                  <div
                    className="book-image"
          
                  >
                    <img src={thumbnail} alt="" />
                  </div>

                  <div className="book-content">
                  
                    <button className="market-bid-button">{item.startdate}</button>
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </>
  );
}

export default Market;
