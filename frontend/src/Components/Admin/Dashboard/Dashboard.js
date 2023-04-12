import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import "./Dashboard.css";
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { myBookAPI } from '../../../Services/adminServices';
import { getAuctionBookListAPI } from '../../../Services/userServices';

export default function Overview() {

  const[users, setUsers] = useState([])
  const[books, setBooks] = useState([])
  const[auction, setAuction] = useState([])
  const [Upcoming, setUpcoming] = useState([])

  useEffect(()=>{

    myBookAPI()
    .then((res)=>{
      if(res.data.success){
        setUsers(res.data.users)
        setBooks(res.data.books)
        setAuction(res.data.auction)
      }
    })

    getAuctionBookListAPI()
    .then((res)=>{
      setUpcoming(res.data.inactiveBooks)
    })
    .catch(err=>console.log(err))

  },[])

  const navigate = useNavigate()

  const handleLogOut = ()=> {
      localStorage.removeItem('adminToken');
      navigate("/admin")
    }

  const premium = users.filter(obj => obj.plan === "Premium Plan")
  const blocked = users.filter(obj => obj.isBlocked === true)
  const rented = books.filter(obj => obj.status === "rented out")
  const reserved = books.filter(obj => obj.reserve === true)
  const sold = auction.filter(obj => obj.status === "Sold")

  return (
  
    <MDBRow className='admin-overview'>
      <BiLogOut style={{margin:'10px auto'}} className='icon' onClick={handleLogOut}></BiLogOut>
      <MDBCol xl={4} lg={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{users.length}</p>
                <p className='text-muted mb-0'>Total Members</p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={4} lg={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>     
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{premium.length}</p>
                <p className='text-muted mb-0'>Premium Members  </p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={4} lg={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>           
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{blocked.length}</p>
                <p className='text-muted mb-0'>Blocked Members</p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={4} lg={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>            
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{books.length}</p>
                <p className='text-muted mb-0'>Total Books</p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={4} lg={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>            
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{rented.length}</p>
                <p className='text-muted mb-0'>Rented Books</p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={4} lg={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>           
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{reserved.length}</p>
                <p className='text-muted mb-0'>Reserved Books</p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={4} lg={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{auction.length}</p>
                <p className='text-muted mb-0'>Total Auction</p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={4} lg={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>     
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{sold.length}</p>
                <p className='text-muted mb-0'>Sold In Auction</p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={4} lg={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex align-items-center'>           
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{Upcoming.length}</p>
                <p className='text-muted mb-0'>Upcoming Bids</p>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}