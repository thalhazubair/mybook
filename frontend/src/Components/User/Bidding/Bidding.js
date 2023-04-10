import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import BidModal from "../BidModal/BidModal";
import { useLocation } from "react-router-dom";
import { getAuctionBookAPI } from "../../../Services/userServices";

function Bidding() {
  const [timerString, setTimerString] = useState("");
  const [show, setShow] = useState(false);
  const [list, setList] = useState({ last_bidded_member: [] });
  const [bidAmount, setBidAmount] = useState(0);
  const location = useLocation();
  const book = location.state.book;
  const bookId = book._id;
  const member = list.last_bidded_member[list.last_bidded_member.length - 1];
  const thumbnail = book.image.url;

  const showModal = () => {
    setShow(true);
  };

  const handleBidAmountChange = (event) => {
    setBidAmount(event.target.value);
  };

  useEffect(() => {
    getAuctionBookAPI({ bookId: bookId })
      .then((res) => {
        if (res.data.success) setList(res.data.doc);
      })
      .catch((err) => console.log(err));

    const endDate = new Date(list.enddate);

    // Initialize the timer string
    let timerString = "";

    // Set up the timer
    const interval = setInterval(() => {
      // Get the current date and time
      const now = new Date();

      // Calculate the time remaining until the end date
      const remaining = endDate.getTime() - now.getTime();

      // If the end date has passed, stop the timer and display "Expired"
      if (remaining <= 0) {
        clearInterval(interval);
        setTimerString("Expired");
        return;
      }

      // Calculate the remaining time as hours, minutes, and seconds
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      // Update the timer string with the remaining time
      timerString = `${days}d:${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      setTimerString(timerString);
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, list.enddate]);

  // console.log(timerString);

  return (
    <MDBCard style={{ alignItems: "center", margin: "auto", top: "30px"}}>
      <div className="d-flex">
      {book.image.map((img,index)=>(
        <MDBCardImage
        key={index}
        position="top"
        alt="..."
        src={img.url}
        style={{ width: "120px"}}
        className={index % 2 === 0 ? "me-2" : ""}
      />
      ))}
      </div>
 
     
      <MDBCardBody
        className="bidding-card-body"
        style={{
          width: "330px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "auto",
          background: "#262222",
        }}
      >
        <MDBCardTitle>Title:{list.title}</MDBCardTitle>
        <MDBCardTitle>Author:{list.author}</MDBCardTitle>
      </MDBCardBody>
      <MDBListGroup flush style={{ padding: "0px" }}>
        <MDBListGroupItem style={{ background: "#F3F2F2" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "280px",
            }}
          >
            <div
              style={{
                width: "50%",
                textAlign: "left",
                borderRight: "1px solid #ccc",
                paddingRight: "1rem",
              }}
            >
              <h5 style={{ fontFamily: "monospace" }}>Starting Bid Price:</h5>
              <span style={{ color: "black" }}>${list.starting_bid_price}</span>
            </div>
            <div
              style={{
                width: "50%",
                borderLeft: "1px solid #ccc",
                paddingLeft: "1rem",
              }}
            >
              <h5 style={{ fontFamily: "monospace" }}>Current Bid Price:</h5>
              <span style={{ color: "black" }}>${list.current_bid_price}</span>
            </div>
          </div>
        </MDBListGroupItem>
      </MDBListGroup>
      <MDBCardBody
        style={{
          width: "330px",
          padding: "6px",
          minHeight: "auto",
          margin: "0px",
        }}
      >
        <MDBListGroupItem style={{ color: "black" }}>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "280px",
            }}
          >
            <div style={{ width: "50%", textAlign: "left" }}>
              <h5
                style={{
                  fontFamily: "monospace",
                  fontSize: "15px",
                  margin: "auto",
                }}
              >
                Live Auction
              </h5>
            </div>
            <div style={{ width: "50%" }}>
              <h5
                className="text-right"
                style={{
                  fontFamily: "monospace",
                  fontSize: "15px",
                  margin: "auto",
                }}
              >
                Bids Made: {list.last_bidded_member.length}
              </h5>
            </div>
          </div>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "280px",
            }}
          >
            <div style={{ width: "50%", textAlign: "left" }}>
              <h5
                style={{
                  fontFamily: "monospace",
                  fontSize: "15px",
                  margin: "auto",
                }}
              >
                Latest Bidder:{member}
              </h5>
            </div>
            <div style={{ width: "50%" }}>
              <h5
                className="text-right"
                style={{
                  fontFamily: "monospace",
                  fontSize: "15px",
                  margin: "auto",
                }}
              >
                {timerString}
              </h5>
            </div>
          </div>
        </MDBListGroupItem>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingTop: "5px",
          }}
        >
          <MDBInput
            label="Enter your bid amount"
            style={{ borderRadius: "20px", borderColor: "#333333" }}
            onChange={handleBidAmountChange}
          />
          <MDBBtn
            onClick={showModal}
            style={{ marginTop: "4px", padding: "10px 80px" }}
            rounded
            color="warning"
          >
            Bid
          </MDBBtn>
          <BidModal
            show={show}
            setShow={setShow}
            bidAmount={bidAmount}
            bookId={book._id}
          />
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Bidding;
