import { Card, Button, Modal, message } from "antd";
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MDBBadge } from "mdbreact";
import { useEffect, useState } from "react";
import { getBookDetails, rentBook, reserveBook, addFavouriteBook } from "../../../Services/userServices";
const { Meta } = Card;

function Bookdetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const thumbnail = location.state.thumbnail;
  const [book, setBook] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [actionType, setActionType] = useState("");

  const data = {
    id: thumbnail,
  }; 

  
  const handleReserve = () => {
    setModalTitle("Do you want to reserve this book?");
    setActionType('reserve')
    setIsModalVisible(true)
  };

  const handleRent = () => {
    setModalTitle("Do you want to rent this book?");
    setActionType('rent')
    setIsModalVisible(true);
  };

  const handlfavourites = () => {
    setModalTitle("Do you want add this book to favourite?");
    setActionType('favourite')
    setIsModalVisible(true);
  }

  const handleOk = (data,link) => {
    if(actionType === 'rent'){
    rentBook({ data: data,link:link}).then((res) => {
      if (res.data.success) {
        navigate("/home");
        message.success(
          <span style={{ color: "black" }}>book successfully rented</span>
        );
      }
    });
  }
    if(actionType === 'reserve'){
    reserveBook({data: data}).then((res)=>{
      if(res.data.rented){
        navigate('/home')
        message.warning(
          <span style={{ color: "black" }}>book is already rented by you</span>
        );
      }if(res.data.exist){
        navigate('/home')
        message.success(
          <span style={{ color: "black" }}>book is already reserved</span>
        );
      }if(res.data.success){
        navigate('/home')
        message.success(
          <span style={{ color: "black" }}>book is successfully reserved</span>
        );
      }
    })
  }if(actionType === 'favourite'){
    addFavouriteBook({data:data}).then((res)=>{
      if(res.data.exist){
        setIsModalVisible(false);
        message.warning(
          <span style={{ color: "black" }}>already in favourite</span>
        );
      }if(res.data.success){
        setIsModalVisible(false);
        message.success(
          <span style={{ color: "black" }}>book added to favourite</span>
        );
      }
    })
  }
  
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getBookDetails(data).then((res) => {
      if (res.data.success) {
        setBook(res.data.doc);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card
        style={{
          width: 300,
          display: "flex",
          margin: "auto",
          flexDirection: "column",
          alignItems: "center",
          top: 100,
        }}
        cover={<img alt="example" src={book.imagelinks} />}
        actions={[
          book.status === "Available" ? (
            <Button
              type="primary"
              style={{ backgroundColor: "green", color: "white" }}
              onClick={() => handleRent()}
            >
              Rent
            </Button>
          ) : (
            <Button
              type="primary"
              style={{ backgroundColor: "blue", color: "white" }}
              onClick={() => handleReserve()}
            >
              Reserve
            </Button>
          ),
          
          <Link to = '/bookreview' state={{ book: thumbnail }}>
          <Button
              type="primary"
              style={{ backgroundColor: "green", color: "white" }}>
              Reviews
            </Button>
            </Link>
      
        ]}
        
      >
        <Meta
          title={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>{book.title}</div>
              <div>
                <MDBBadge color="primary">{book.status}</MDBBadge>
              </div>
              <HeartFilled  onClick={() => handlfavourites()} style={{ fontSize: '24px',marginTop:'5px', color:'red'}}/> 
              {book.status === "rented out" ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
            <MDBBadge color="primary" style={{ marginBottom: "5px" }}>
              Rented Date : {book.rentedDate}
            </MDBBadge>
          </div>
        ) : null}
            </div> 
          }
        />
      </Card>
      
     
      <Modal
        title={modalTitle}
        open={isModalVisible}
        onOk={() => handleOk(book.title,book.imagelinks)}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "green", color: "white" } }}
        cancelButtonProps={{
          style: { backgroundColor: "red", color: "white" },
        }}
        width={300}
      >
        <p style={{ color: "red" }}>{book.title}</p>
      </Modal>
      
    </>
  );
}

export default Bookdetails;
