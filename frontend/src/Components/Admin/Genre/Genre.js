import React, {useEffect, useState} from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './Genre.css'
import AddGenre from '../AddGenre/AddGenre';
import Swal from 'sweetalert2'
import { blockGenreAPI, genreAPI, unBlockAPI } from '../../../Services/adminServices';

function Genre() {

  const [show, setShow] = useState(false);
  const [genre, setGenre] = useState([])

  const showModal = () => {
    setShow(true);
  };

  const handleBlock = (id)=>{

    Swal.fire({
      
      text: "Are you sure you want to block the Genre?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'
    }).then((result)=>{
      if(result.isConfirmed){

        blockGenreAPI(id)
        .then((response)=>{
          if(response.data.success){
            const setUser = genre.filter((value)=>{
              if(value._id === id){
                value.isBlocked = true
              }
              return value
            })
            setGenre(setUser)
          }
        })
      }
    })
  }
  
  const handleUnBlock = (id)=>{

    Swal.fire({
      
      text: "Are you sure you want to Unblock the Genre?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'
    }).then((result)=>{

      if(result.isConfirmed){
       
        unBlockAPI(id)
        .then((response)=>{
          if(response.data.success){
            const setUser = genre.filter((value)=>{
              if(value._id === id){
                value.isBlocked = false
              }
              return value
            })
            setGenre(setUser)
          }
        })
      }
    })
  }

  useEffect(()=>{
    console.log("hiiii");
    genreAPI()
    .then((res)=>{
    if(res.data.success){
      setGenre(res.data.genre)
    }    
    })
  },[show])

  

  return (
    <div style={{width:'100%'}}>
    <div className='admin-genre'>
    <MDBTable align='middle' className='genre-table-align'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Id</th>
          <th scope='col'>Genre</th>
          <th scope='col'>Status</th>
          <th scope='col' className='action'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {genre.map((doc, index)=>{
 return(
  <tr>
  <td>
      <div key={index} className='d-flex align-items-center'>
        <div>
          <p className='fw-bold mb-1'>#{index+1}</p>
        </div>
      </div>
    </td>
    <td>
      <div className='d-flex align-items-center'>
        <div>
          <p className='fw-bold mb-1'>{doc.genre}</p>
        </div>
      </div>
    </td>
    <td>
      <p className='fw-normal mb-1'>{doc.status}</p>
    </td>
    <td className='genre-action'>
    {
                doc.isBlocked ===false ?
                <MDBBtn color='success' rounded size='sm' onClick={()=>handleBlock(doc._id)}>Block</MDBBtn> :
                <MDBBtn color='danger' rounded size='sm' onClick={()=>handleUnBlock(doc._id)}>UnBlock</MDBBtn> 
                }
    </td>
  </tr>
  )
        })}
       
        
      </MDBTableBody>
    </MDBTable>
    
    </div>
   
    <MDBBtn onClick={showModal} rounded color='info' style={{display:'flex',margin:'auto',top:'20px'}}>
        ADD
      </MDBBtn>
      <AddGenre show={show} setShow={setShow} />

    </div>
  );
}

export default Genre