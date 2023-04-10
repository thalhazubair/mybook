import React, {useEffect, useState} from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './Members.css'
import Swal from 'sweetalert2'
import { blockAPI, membersAPI, unBlockAPI } from '../../../Services/adminServices';

function Member() {

  const[users, setUsers] = useState([])

  const handleBlock = (id)=>{

    Swal.fire({
      
      text: "Are you sure you want to block this User?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'
    }).then((result)=>{
      if(result.isConfirmed){

       blockAPI(id)
        .then((response)=>{
          if(response.data.success){
            const setUser = users.filter((value)=>{
              if(value._id === id){
                value.isBlocked = true
              }
              return value
            })
            setUsers(setUser)
          }
        })
      }
    })
  }
  
  const handleUnBlock = (id)=>{

    Swal.fire({
      
      text: "Are you sure you want to Unblock this User?",
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
            const setUser = users.filter((value)=>{
              if(value._id === id){
                value.isBlocked = false
              }
              return value
            })
            setUsers(setUser)
          }
        })
      }
    })
  }
  useEffect(()=>{
   membersAPI()
  .then((res)=>{
    if(res.data.success){
      setUsers(res.data.users)
    }
  })
  },[])

  return (
    <div className='admin-members'>
    <MDBTable align='middle' className='member-table-align'>
      <MDBTableHead>
        <tr>
          <th scope='col'>FullName</th>
          <th scope='col'>UserName</th>
          <th scope='col'>Email</th>
          <th scope='col'>Mobile</th>
          <th scope='col'>Plan</th>
          <th scope='col'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {users.map((doc, index)=>{
          return(
            <tr>
            <td>
                <div key={index} className='d-flex align-items-center'>
                  <div>
                    <p className='fw-bold mb-1'>{doc.fullname}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <div>
                    <p className='fw-bold mb-1'>{doc.username}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{doc.email}</p>
              </td>
              <td>
              <p className='fw-normal mb-1'>{doc.phone}</p>
    
              </td>
              <td>{doc.plan}</td>
              <td>
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
  );
}

export default Member