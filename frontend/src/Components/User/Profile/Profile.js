import React, {useEffect} from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage,MDBTypography} from 'mdb-react-ui-kit';
import './Profile.css'
import { Button} from 'semantic-ui-react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsAPI } from '../../../Services/userServices';
import { message } from 'antd'


export default function ProfileStatistics() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state);

  useEffect(() => {
    
    getUserDetailsAPI() 
      .then((res) => {
        if(res.data.blocked){
          navigate('/')
          localStorage.removeItem('userToken');
          message.error(<span style={{color: 'black' }}>Sorry, You Have Been Blocked</span>)
        }

        if (res.data.success) {
          console.log("Asdasda");
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

    const handleLogOut = ()=> {
      dispatch({
        type: "RemoveUser",
      })
      localStorage.removeItem('userToken');
      navigate("/")
    }

  return (
    <div className='profile-main'>
    <div className="vh-100" style={{ backgroundColor: 'rgb(58 57 57)' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4" className='profile-res' style={{ height: '500px',  width: '400px', marginLeft: '250px' }}>
            <MDBCard className='profile-card-body' style={{ borderRadius: '15px', height: '100%' }}>
              <MDBCardBody className="text-center profile-center">
                <div >
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-circle" fluid style={{ width: '100px',margin:'auto' }} />
                </div>
                <MDBTypography tag="h4" style={{ padding: '5px' }}>{user.fullname}</MDBTypography>
                <MDBCardText className="text-muted mb-1">
                  @{user.username}
                </MDBCardText>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Link to='/editprofile'>
                <Button className='profile-btn' variant="primary">Edit Profile</Button>
                  </Link>
                <Link to="/subscription">
                <Button className='profile-btn' variant="primary" style={{backgroundColor:'blue'}}>Subscription</Button>
                </Link>
                </div>
                <div className="card-body-stats">
                  <div>
                    
                    <MDBCardText className="small text-muted mb-0">Total Checkout</MDBCardText>
                    <MDBCardText className="mb-1 h5 profile-text">11</MDBCardText>
                  </div>
                  <div className="px-3">
                   
                    <MDBCardText className="small text-muted mb-0">Total Reserved</MDBCardText>
                    <MDBCardText className="mb-1 h5 profile-text">2</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="small text-muted mb-0">Subscription</MDBCardText>
                    <MDBCardText className="mb-1 h5 profile-text">{user.plan}</MDBCardText>

                  </div>
                  <Button className='profile-btn' variant="primary" style={{backgroundColor:'black'}} onClick={handleLogOut}>LogOut</Button>

                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    </div>
  );
}