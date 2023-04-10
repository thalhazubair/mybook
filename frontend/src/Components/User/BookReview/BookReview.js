import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import "./BookReview.css";
import { useLocation } from "react-router-dom";
import { getBookReviewAPI } from "../../../Services/userServices";

function BookReview() {
  const location = useLocation();
  const [book, setBook] = useState([]);
  const title = location.state.book;

  const data = {
    title: title,
  };

  useEffect(() => {
    getBookReviewAPI(data).then((res) => {
        setBook(res.data.doc.reviews);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  console.log(book);
  return (
    <div
      className="bookreviews"
      style={{ display: "flex", justifyContent: "center", marginTop: "8rem" }}
    >
      <MDBContainer style={{display:'block'}}>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {book.map((item, index) => {
              return(
              <MDBCard style={{margin:'20px'}}>
                <MDBCardBody>
                    <MDBCol>
                      {" "}
                      <p className="text-muted fw-light mb-3">
                       {item.review}
                      </p>
                      <p className="fw-bold lead mb-2">
                        <strong>-{item.username}</strong>
                      </p>
                    </MDBCol>
                
                </MDBCardBody>
              </MDBCard>
              )
           })} 
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default BookReview;
