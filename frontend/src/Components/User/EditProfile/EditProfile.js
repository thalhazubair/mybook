import React, {useEffect, useState} from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useSelector,useDispatch } from "react-redux";
import { userEditAPI, getUserDetailsAPI } from '../../../Services/userServices';
import { useNavigate } from 'react-router-dom';


export default function ProfilePage() {

   const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state);

    useEffect(() => {
      // fetch user details from backend
      getUserDetailsAPI()
        .then((res) => {
          if (res.data.success) {
            const data = res.data.doc;
            dispatch({
              type: "StoreUser",
              fullname: data.fullname,
              username: data.username,
              email: data.email,
              phone: data.phone,
              plan: data.plan,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

     
    const [formValues, setFormValues] = useState({
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      phone: user.phone,
      plan: user.plan
    });

     
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
      };

      
        const handleSubmit = (e) =>{
            e.preventDefault()
           userEditAPI(formValues)
           .then((res)=>{
            if(res.data.success){
                const data = res.data.doc
                dispatch({
                    type: "StoreUser",
                    fullname:data.fullname,
                    username:data.username,
                    email:data.email,
                    phone:data.phone,
                    plan:data.plan,
                  })
                  navigate('/profile')
            }
           })
        }
    

  return (
    <div  className='profile-main'>
    <section style={{ backgroundColor: '#eee'}}>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol md="12" xl="4" className='profile-res' style={{ height: '500px',  width: '400px', marginLeft: '250px' }}>
        <form onSubmit={ handleSubmit }>
            <MDBCard style={{padding:"0px", alignItems:'center',}}>
              <MDBCardBody style={{margin:'0px'}}>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput name='fullname' value={formValues.fullname} onChange={handleChange}></MDBInput>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>User Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBInput readOnly name='username' value={formValues.username} onChange={handleChange}></MDBInput>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBInput readOnly name='email' value={formValues.email} onChange={handleChange}></MDBInput>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBInput readOnly name='phone' value={formValues.phone} onChange={handleChange}></MDBInput>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Plan</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBInput readOnly name='plan' value={formValues.plan} onChange={handleChange}></MDBInput>
                  </MDBCol>
                </MDBRow>
                
              </MDBCardBody>
              <MDBBtn outline className='mx-2 px-3' color='white' size='md' style={{width:'100px', margin:'10px'}}>
              Submit
            </MDBBtn>
            </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </div>
  );
}