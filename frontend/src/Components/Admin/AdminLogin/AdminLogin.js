import React, {useState} from 'react';
import './AdminLogin.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { adminLoginAPI } from '../../../Services/adminServices';

function AdminLogin() {

  const navigate = useNavigate()

  const initialValue = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValue);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const data =  {
    email: formValues.email,
    password: formValues.password
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    adminLoginAPI(data)
      .then(function(response) {
        if(response.data.admin){
          message.error(<span style={{color: 'black' }}>Sorry, Admin does not exist</span>)
        }
        if (response.data.success) {
          const jwtToken = response.data.token
          
          localStorage.setItem("adminToken",jwtToken)
          navigate('/admin/members')
        }
      })
      .catch(function (error) {
        
      });
    }
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
<form onSubmit={handleSubmit}>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px',paddingBottom:'0px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100' style={{backgroundColor:'black'}}>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email' id='formControlLg' type='name' name='email'  value={formValues.email} onChange={handleChange} size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' name='password'  value={formValues.password} onChange={handleChange} size="lg"/>

              <MDBBtn outline className='mx-2 px-5' color='white' size='lg'>
                Login
              </MDBBtn>

            </MDBCardBody>
          </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default AdminLogin;