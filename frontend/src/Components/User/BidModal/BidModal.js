import React from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import {postBidPriceAPI} from '../../../Services/userServices'
import { message } from 'antd';


 function BidModal({show, setShow, bidAmount, bookId}) {
  
    const toggleModal = () => setShow(!show);

    const data = {
      price:bidAmount,
      id : bookId
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
 
      postBidPriceAPI(data)
      .then((res)=>{
        if(res.data.exist){
          toggleModal()
          message.error(<span style={{color: 'black' }}>Sorry, You Are Already the Highest Bidder</span>)
        }
        if(res.data.success){
          toggleModal()}
      })
    }

  return (
    <>
      <MDBModal staticBackdrop tabIndex='-1' show={show} setShow={setShow}  style={{ zIndex: show ? 9999 : -1 }}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Confirm Bid</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>You have placed a bid for ${bidAmount}. Should we place this as your Bid?</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Confirm</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default BidModal