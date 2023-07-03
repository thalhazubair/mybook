import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { message } from "antd";
import { addBookAPI, genreAuctionAPI} from "../../../Services/adminServices";

function AddBook() {

    const navigate = useNavigate()
    
  const initialValue = {
    title: "",
    author: "",
    genre:""
  };
  
  const [formValues, setFormValues] = useState(initialValue);
  const [image, setImage] = useState([])
  const [genre, setGenre] = useState([])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = event => {
    setImage(event.target.files) 
}

  const handleSubmit = (e) => {

    e.preventDefault();  

    const data = new FormData();
    data.append('title', formValues.title);
    data.append('author', formValues.author)
    data.append('genre', formValues.genre);
    
    for (let i = 0; i < image.length; i++) {
      data.append('file', image[i]);
    }

    const headers = {
      headers: {
        "Content-Type": "multipart/form-data"    
    }
    }


    addBookAPI(data,headers)
    .then((res) =>{
      if(res.data.success){
        navigate('/admin/addedbooks')
        message.success(<span style={{color: 'black' }}>Bok added succesfully</span>)
      }
    })
    .catch(function (error) {
      
    });
  }

  useEffect(()=>{
    genreAuctionAPI()
    .then((res)=>{
    if(res.data.success){
      setGenre(res.data.genre)
    }
    })
  },[])


  return (
    <MDBContainer className="admin-add-auction" fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <form onSubmit={handleSubmit}>
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{
                borderRadius: "1rem",
                maxWidth: "400px",
                paddingBottom: "0px",
              }}
            >
              <MDBCardBody
                className="p-3 d-flex flex-column align-items-center mx-auto w-100"
                style={{ backgroundColor: "#1e1d1d" }}
              >
                <h2
                  className="mb-3 text-uppercase"
                  style={{ fontSize: "24px" }}
                >
                  Add Book
                </h2>
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Title"
                  id="formControlLg"
                  type="name"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  className="input-text"
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Author"
                  id="formControlLg"
                  type="name"
                  name="author"
                  value={formValues.author}
                  onChange={handleChange}
                  className="input-text"
                  size="lg"
                />
 
 <select
                  className="form-select form-select-lg mb-3"
                  aria-label="Genre"
                  type="name"
                  name="genre"
                  onChange={handleChange}
                  value={formValues.genre}
                  style={{ backgroundColor: "rgb(30 29 28)", color: "white" }}
                >
                  <option value="">Choose a genre...</option>
                  {genre.map((data,index)=>{
                    return(
                      <option key={index} value={data.genre}>{data.genre}</option>
                    )
                  })}
    
                </select>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  id="formControlLg"
                  type="file"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                  className="input-text"
                  size="lg"
                  multiple
                />

                <div>
                  <div className="selecte_text">Selected Image</div>
                  {/* <img src={formValues.file ? URL.createObjectURL(formValues.file) : ""} alt="" /> */}
                </div>

                <MDBBtn outline className="mx-2 px-5" color="white" size="lg">
                  Submit
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AddBook;
