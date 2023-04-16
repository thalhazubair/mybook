import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  MDBBtn,
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import "./Addedbooks.css";
import { Link } from "react-router-dom";
import { bookReturnAPI } from "../../../Services/adminServices";
import { getAddedBookAPI } from "../../../Services/userServices"


export default function AddedBooks() {
  const [book, setBook] = useState([]);
  const [search, setsearch] = useState("");
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [returnClicked, setReturnClicked] = useState(false);
  console.log(itemsPerPage);

  const handleChange = (e) => {
    setsearch(e.target.value);
    console.log(search);
    if (e.target.value !== "") {
      const newPacientes = book.filter(
        (value) =>
          value.title &&
          value.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(newPacientes);
      setFilteredDocs(newPacientes);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReturn = (id)=>{

       bookReturnAPI({id:id})
       .then((res)=>{
        if(res.data.success){
          message.success(<span style={{color: 'black' }}>Successfully Returned</span>)
          setReturnClicked(true)
        }
       })
      
    }

    useEffect(() => {
      getAddedBookAPI().then((res) => {
        if (res.data.success) {
          setBook(res.data.newBook);
          setReturnClicked(false);
        }
      });
    }, [returnClicked]);

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
    
    <div className="book-details">
      <Link to="/admin/addbook">
        <MDBBtn  rounded color='info' style={{display:'flex', marginBottom:'10px'}}>
        ADD Book
      </MDBBtn>
      </Link>
      <div class="form-outline" style={{ display: "flex" }}>
        <input
          style={{
            background: "black",
            border: "1px solid #ffff",
            borderRadius: "20px",
          }}
          type="text"
          id="form1"
          class="form-control"
          value={search}
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="search"
        />
      </div>

      <div className="table-container">
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th
              scope="col"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Name
            </th>
            <th scope="col">Author</th>
            <th scope="col">Status</th>
            <th scope='col'>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {search === "" &&
            currentItems.map((doc, index) => {
              return (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                    {doc.image.map((img, index) => (
              <img
              key={index}
                src={img.url}
                alt=''
                style={{ width: '90px', height: '134px', marginRight:'5px'}}
              />
              ))}
                      <div className="ms-3">
                        
                        <p className="fw-bold mb-1">{doc.title}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                  <p className="text-muted mb-0">{doc.author}</p>
                  </td>
                  <td>
              <MDBBadge color={doc.status === "rented out" ? "success" : "primary"} pill style={{fontSize:'10px'}}>
                  {doc.status}
                </MDBBadge>
              </td>
              <td>
                {
                doc.status === "rented out" ?
                <MDBBtn color='success' rounded size='sm' onClick={()=>handleReturn(doc.title)} >Return</MDBBtn> :
                <></>
                }
              </td>
                </tr>
              );
            })}
          {search !== "" &&
            filteredDocs.map((doc, index) => {
              return (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                    {doc.image.map((img, index) => (
              <img
              key={index}
                src={img.url}
                alt=''
                style={{ width: '90px', height: '134px', marginRight:'5px'}}
              />
              ))}
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{doc.title}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{doc.authors}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{doc.categories}</p>
                  </td>
                </tr>
              );
            })}
        </MDBTableBody>
        {filteredDocs.length === 0 && search !== "" && (
          <div>
            <h1>No result</h1>
          </div>
        )}
      </MDBTable>
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
