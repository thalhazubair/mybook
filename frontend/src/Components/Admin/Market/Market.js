import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './Market.css'
import { auctionAPI } from '../../../Services/adminServices';


export default function Auction() {

 const [book, setBook] = useState([])


 useEffect(()=>{

    auctionAPI()
    .then((res)=>{
        if(res.data.success){
            setBook(res.data.books)
        }
        else{
            console.log("error");
        }
    })

 },[])

  return (
    <div className='admin-auction'>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Author</th>
          <th scope='col'>Genre</th>
          <th scope='col'>Status</th>
          <th scope='col'>Starting Bid</th>
          <th scope='col'>Bid Start</th>
          <th scope='col'>Bid End</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {book.map((doc,index)=>{
            return(

                <tr>
          <td>
            <div className='d-flex align-items-center'>
            {doc.image.map((img, index) => (
              <img
              key={index}
                src={img.url}
                alt=''
                style={{ width: '90px', height: '115px', marginRight:'5px'}}
              />
              ))}
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{doc.title}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='text-muted mb-0'>{doc.author}</p>
          </td>
          <td>
            <p className='text-muted mb-0'>{doc.genre}</p>
          </td>
          <td>
            <MDBBadge color={
      doc.status === "Sold"
        ? "success"
        : doc.status === "Active"
        ? "primary"
        : "danger"
    } pill>
              {doc.status}
            </MDBBadge>
          </td>
          <td>${doc.starting_bid_price}</td>
          <td>
          <MDBBadge color='primary' pill>
              {doc.startdate}
            </MDBBadge>
          </td>
          <td>
          <MDBBadge color='primary' pill>
              {doc.enddate}
            </MDBBadge>
          </td>
        </tr>

            )
        })}
        
      </MDBTableBody>
    </MDBTable>
    </div>
  );
}