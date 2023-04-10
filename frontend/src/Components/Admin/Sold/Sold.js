import React,{useEffect, useState} from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import './Sold.css'

import { getSoldBookAPI } from '../../../Services/adminServices'

 function Bidding() {

    const [list, setList] = useState([])


    useEffect(() =>{ 
      getSoldBookAPI()
      .then((res)=>{
        if(res.data.success)
        setList(res.data.doc)
      })
      .catch(err=>console.log(err)) 
    
    }, []); 

    
    

  return (
<>
<div className='admin-sold'>
 { list.map((doc,index) => {

        return(
        
            <MDBCard className='admin-sold-card'>
            <MDBCardImage position='top' src={doc.image[0].url} alt='...' style={{width:'140px'}}/>
            <MDBCardBody className='bidding-card-body' style={{width:'330px', margin:'auto', display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center',minHeight:'auto',background:'#262222'}}>
              <MDBCardTitle>Title:{doc.title}</MDBCardTitle>
              <MDBCardTitle>Author:{doc.author}</MDBCardTitle>
      
            </MDBCardBody>
            <MDBListGroup flush style={{padding:'0px'}}>
              <MDBListGroupItem style={{background:'#F3F2F2'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '280px' }}>
          <div style={{ width: '50%', textAlign: 'left',borderRight: '1px solid #ccc', paddingRight: '1rem' }}>
          <h5 style={{fontFamily:'monospace'}}>Bid Price:</h5>
            <span style={{color:'black'}}>${doc.starting_bid_price}</span>
          </div>
          <div style={{ width: '50%',borderLeft: '1px solid #ccc', paddingLeft: '1rem'}}>
          <h5 style={{fontFamily:'monospace'}}>Sold Price:</h5>
            <span style={{color:'black'}}>${doc.current_bid_price}</span>
          </div>
        </div>
              </MDBListGroupItem>
            </MDBListGroup>
            <MDBCardBody style={{width:'330px',padding:'6px',minHeight:'auto',margin:'0px'}}>
              <MDBListGroupItem style={{color:'black'}}> <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '280px' }}>
          <div style={{ width: '50%', textAlign: 'left'}}>
          <h5 style={{fontFamily:'monospace',fontSize:'15px',margin:'auto'}}>Auction Ended</h5>
          </div>
          <div style={{ width: '50%'}}>
          <h5 className='text-right' style={{fontFamily:'monospace',fontSize:'15px',margin:'auto'}}>Bids Made: {doc.last_bidded_member.length}</h5>
          </div>
        </div></MDBListGroupItem>
        <MDBListGroupItem>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '280px' }}>
          <div style={{ width: '50%', textAlign: 'left'}}>
            
          <h5 style={{fontFamily:'monospace',fontSize:'15px',margin:'auto'}}>Buyer:{doc.last_bidded_member[doc.last_bidded_member.length - 1]}</h5>
          </div>
          <div style={{ width: '50%'}}>
          <h5 className='text-right' style={{fontFamily:'monospace',fontSize:'15px',margin:'auto'}}>{}</h5>
          </div>
        </div>
        </MDBListGroupItem>
        <MDBListGroupItem>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '280px' }}>
          <div style={{ width: '100%', textAlign: 'left'}}>      
          <h5 style={{fontFamily:'monospace',fontSize:'15px',margin:'auto'}}>Participants:{[...new Set(doc.last_bidded_member)].join(',')}</h5>
          </div>
        </div>
        </MDBListGroupItem>
            </MDBCardBody>
          </MDBCard>
          
        )
    })}
    </div>
    </>
  );
}

export default Bidding

