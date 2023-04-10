import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Signup.css'
import Swal from "sweetalert2";


import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate()

  const initialValue = {
    fullname: "",
    username:"",
    email: "",
    phone: "",
    password: "",
    confirmpassword:""
    
  };
  
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);
  // const [justifyActive, setJustifyActive] = useState('tab1');

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post("http://localhost:9000/signup", {
          fullname: formValues.fullname,
          username: formValues.username,
          email: formValues.email,
          phone: formValues.phone,
          password: formValues.password,
          confirmpassword: formValues.confirmpassword
        })
        .then(function (response) {
          console.log(response);
          if (response.data.success) {
            navigate('/otp',{
            state:{
              fullname: formValues.fullname,
              username: formValues.username,
              email: formValues.email,
              phone: formValues.phone,
              password: formValues.password,
              }
            })
          }
          if(response.data.email){
            console.log("exist");
            Swal.fire('Email already exist')
          }
          if(response.data.username){
            console.log("exist");
            Swal.fire('Username already exist')
          }
          if(response.data.phone){
            console.log("exist");
            Swal.fire('Phone already exist')
          }
          if(response.data.password){
            console.log("exist");
            Swal.fire('Password not matching')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.fullname) {
      errors.name = "name is required";
    } else if (!/^[A-Za-z\s]*$/.test(values.fullname)) {
      errors.name = "Username should only contain alphabets and space";
    }
    if (!values.username) {
      errors.username = "username is required";
    }

    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 4) {
      errors.password = "password is should atleast contain 4 characters";
    } else if (values.password.length >= 10) {
      errors.password = "password is should exceed 10 characters";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    } else if (values.phone.length !== 10) {
      errors.phone = "Invalid phone number";
    }
    if (!values.email) {
      errors.email = "email is required";
    } else if (
      !String(values.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  return (
  
    <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>
        <form onSubmit={ handleSubmit }>

        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px',paddingBottom:'0px'}}>
          <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100' style={{backgroundColor:'black'}}>
       

            <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Fullname' id='formControlLg' type='name' name='fullname' value={formValues.fullname} onChange={handleChange} className='input-text' size="lg"/>
            <p className="error">{formErrors.name}</p>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' type='name' name='username' value={formValues.username} onChange={handleChange} className='input-text' size="lg"/>
            <p className="error">{formErrors.username}</p>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email' id='formControlLg' type='email' name='email' value={formValues.email} onChange={handleChange} className='input-text' size="lg"/>
            <p className="error">{formErrors.email}</p>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Phone' id='formControlLg' type='number' name='phone' value={formValues.phone} onChange={handleChange} className='input-text' size="lg"/>
            <p className="error">{formErrors.phone}</p>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' name='password' value={formValues.password} onChange={handleChange} className='input-text' size="lg"/>
            <p className="error">{formErrors.password}</p>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='ConfirmPassword' id='formControlLg' type='password' name='confirmpassword' value={formValues.confirmpassword} onChange={handleChange} className='input-text' size="lg"/>


            <MDBBtn outline className='mx-2 px-5' color='white' size='lg'>
              Signup
            </MDBBtn>
            <div>
              <p className="mb-0 mt-3">Have an account? <Link to="/" class="text-white-50 fw-bold">Log In</Link></p>

            </div>
          </MDBCardBody>
        </MDBCard>
            </form>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
  
  );
}

export default Login;