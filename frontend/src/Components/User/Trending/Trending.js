import React, { useState, useEffect } from "react";
import "./Trending.css";
import { getUserDetailsAPI, getBook, getAddedBookAPI } from '../../../Services/userServices';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom';

function Trending() {
  const navigate = useNavigate()
  const [book, setBook] = useState([])
  const [favourite, setFavourite] = useState([])
  const [newBook, setNewBook] = useState([])

  

  useEffect(() =>{

    getUserDetailsAPI() 
      .then((res) => {
        if(res.data.blocked){
          navigate('/')
          localStorage.removeItem('userToken');
          message.error(<span style={{color: 'black' }}>Sorry, You Have Been Blocked</span>)
        }
      })

      getBook().then((res) => {
        if (res.data.success) {
          const books = res.data.doc
          const rentedBooks = []
          const favouriteBooks = []

          books.forEach((book) => {
            if (book.rentedusers.length > 0) {
              rentedBooks.push(book);
            }
  
            if (book.favouritedusers.length > 0) {
              favouriteBooks.push(book);
            }
          });

          setBook(rentedBooks);
          setFavourite(favouriteBooks);

        }
      }); 

      getAddedBookAPI()
      .then((res)=>{
if(res.data.success){
setNewBook(res.data.newBook)
}
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log(newBook);

  return (
    <div>
     
<div className="home-content">
<div class="input-group" style={{justifyContent:'end',right:'20px',bottom:'30px'}}>
  <div class="form-outline" style={{display:'flex'}} >
    <input style={{background:'black',border:'1px solid #ffffff4b',borderRadius:'20px'}} type="search" id="form1" class="form-control" />
    <label class="form-label" for="form1" style={{color:'white', paddingLeft: '10px'}}>Search</label>
  </div>
</div>
<div class="container-fluid">
    <h2 class="trending-novel-rented">Most Rented</h2>
    <div class="d-flex flex-row overflow-auto flex-nowrap card-trending">
      {book.map((item, index)=>{
        let thumbnail = item.imagelinks
        return( 
          <div 
          key={index} class="card card-body-trending"
        > <img src={thumbnail} alt="" />
        </div>
        )
      })}
    </div>
</div>

<div class="container-fluid">
    <h2 class="trending-novel-favourited">Most Favourited</h2>
    <div class="d-flex flex-row overflow-auto flex-nowrap card-trending">
      {favourite.map((item, index)=>{
        let thumbnail = item.imagelinks;
        return(
          <div 
          key={index} class="card card-body-trending"
        > <img src={thumbnail} alt="" />
        </div>
        )
      })}
    </div>
</div>

<div class="container-fluid">
    <h2 class="trending-novel-favourited">Recently Added</h2>
    <div class="d-flex flex-row overflow-auto flex-nowrap card-trending">
      {newBook.map((item, index)=>{
        let thumbnail = item.image[0].url;
        return(
          <div 
          key={index} class="card card-body-trending"
        > <img src={thumbnail} alt="" />
        </div>
        )
      })}
    </div>
</div>
      </div>
    </div>
  );
}

export default Trending;
