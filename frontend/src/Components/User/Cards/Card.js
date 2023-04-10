import React, { useState, useEffect } from "react";
import "./Cards.css";
import { getUserDetailsAPI,getAuthors } from '../../../Services/userServices';
import { message } from 'antd'
import { useNavigate, Link } from 'react-router-dom';
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { getBook } from "../../../Services/userServices";

function Card() {
  const navigate = useNavigate()
  const [search, setsearch] = useState("");
  const [book, setBookData] = useState([])
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(14);
  const [author, setAuthor] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");


  useEffect(() =>{

    getUserDetailsAPI() 
      .then((res) => {
        if(res.data.blocked){
          navigate('/')
          localStorage.removeItem('userToken');
          message.error(<span style={{color: 'black' }}>Sorry, You Have Been Blocked</span>)
        }
      })

      getAuthors()
      .then((res)=>{
        if(res.data.success){
          setAuthor(res.data.authors)
        }
      })

      getBook().then((res) => {
        if (res.data.success) {
          setBookData(res.data.doc);
        }
      }); 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  const handleChange = (e) => {
    setsearch(e.target.value);
    

    if (e.target.value !== "") {
      const newPacientes = book.filter((value) =>
        value.title && value.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
   
      setFilteredDocs(newPacientes);
    }
  };

  const handleAuthorFilter = (e) => {
    const selectedAuthor = e.target.value;
    setSelectedAuthor(selectedAuthor);
  
    const newPacientes = book.filter((value) =>
      selectedAuthor === "" || value.authors.includes(selectedAuthor)
    );
  
    setFilteredDocs(newPacientes);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredDocs.length === 0
      ? book.slice(indexOfFirstItem, indexOfLastItem)
      : filteredDocs.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (
    let i = 1;
    i <=
    Math.ceil(
      filteredDocs.length === 0
        ? book.length / itemsPerPage
        : filteredDocs.length / itemsPerPage
    );
    i++
  ) {
    pageNumbers.push(i);
  }
      
    return (
      
      <div className="home-content">
      <div class="input-group" style={{justifyContent:'end',right:'10px',bottom:'30px'}}>
      
        <div class="form-outline" style={{display:'flex'}} >
          <input style={{background:'black',border:'1px solid #ffffff4b',borderRadius:'20px',height:'40px'}} type="text" value={search}  onChange={(e) => {handleChange(e)}} id="form1" class="form-control" />
          <select
          style={{
            background: "black",
            border: "1px solid #ffffff4b",
            borderRadius: "20px",
            height: "40px",
            color: "white",
            marginLeft: "10px",
            width:"100px",
            outline:"none"
          }}
          value={selectedAuthor}
          onChange={handleAuthorFilter}
        >
          <option value="">All Authors</option>
          {author.map((authorName, index) => (
            <option key={index} value={authorName}>
              {authorName} 
            </option>
          ))}
        </select>
            <label className="form-label" htmlFor="form1" style={{ color: 'white', paddingLeft: '10px' }}>Search</label>
        </div>
      
      </div>
      <div class="container-fluid">
          <h2 class="font-weight-light novel">NOVEL</h2>
          <div class="d-flex flex-row overflow-auto flex-wrap card-home maxWidth:'100%'">
            {search === "" && currentItems.map((item, index)=>{
              let thumbnail = item.imagelinks
              let title = item.title
              return(
                <Link to="/bookdetails" state={{thumbnail:thumbnail,title:title}}>
                <div 
                key={index} class="card card-body-home"
              > <img src={thumbnail} alt="" />
              </div>
              </Link>
              )
            })}
             {search !== "" && filteredDocs.map((item, index)=>{
              let thumbnail = item.imagelinks 
              return(
                <div 
                key={index} class="card card-body-home"
              > <img src={thumbnail} alt="" />
              </div>
              )
            })}
            {filteredDocs.length === 0 && search !== "" && (
                <div>
                  <h1>No result</h1>
                </div>
              )}
          </div>
      </div>
         
      
       <nav aria-label="...">
              <MDBPagination
                style={{ justifyContent: "center" }}
                size="sm"
                className="mb-0"
              >
                {pageNumbers.map((number) => (
                  <MDBPaginationItem key={number} active={number === currentPage}>
                    <MDBPaginationLink
                      tag="span"
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                      {number === currentPage && (
                        <span className="visually-hidden">(current)</span>
                      )}
                    </MDBPaginationLink>
                  </MDBPaginationItem>
                ))}
              </MDBPagination>
            </nav>
            </div>
          
          
        );
      }

export default Card;
