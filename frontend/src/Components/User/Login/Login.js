import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoginAPI } from "../../../Services/userServices";
import { message } from "antd";
import "./Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValue = {
    username: "",
    password: "",
  };

  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const data = {
    username: formValues.username,
    password: formValues.password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      userLoginAPI(data)
        .then(function (response) {
          if (response.data.username) {
            message.error(
              <span style={{ color: "black" }}>Sorry, User does not exist</span>
            );
          }
          if (response.data.password) {
            message.error(
              <span style={{ color: "black" }}>Sorry, Wrong password</span>
            );
          }
          if (response.data.blocked) {
            message.error(
              <span style={{ color: "black" }}>
                Sorry, You Have Been Blocked
              </span>
            );
          }
          if (response.data.success) {
            const jwtToken = response.data.token;
            const data = response.data.doc;

            dispatch({
              type: "StoreUser",
              fullname: data.fullname,
              username: data.username,
              email: data.email,
              phone: data.phone,
              plan: data.plan,
              isBlocked: data.isBlocked,
            });
            localStorage.setItem("userToken", jwtToken);
            navigate("/home");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <MDBContainer fluid>
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
                className="p-5 d-flex flex-column align-items-center mx-auto w-100"
                style={{ backgroundColor: "black" }}
              >
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Username"
                  id="formControlname"
                  type="name"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  size="lg"
                  style={{ color: "white" }}
                />
                <p className="error">{formErrors.username}</p>
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formControlpass"
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  size="lg"
                  style={{ color: "white" }}
                />
                <p className="error">{formErrors.password}</p>

                <p className="small mb-3 pb-lg-2">
                  <a className="text-white-50" href="#!">
                    Forgot password?
                  </a>
                </p>
                <MDBBtn
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                  style={{ color: "white" }}
                >
                  Login
                </MDBBtn>

                <div>
                  <p className="mb-0 mt-3">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
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
