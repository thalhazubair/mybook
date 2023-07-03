import React, { useState } from "react";
import { message } from "antd";
import {
  MDBBtn,
  MDBContainer,
  MDBModalDialog,
  MDBModal,
  MDBModalContent,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { addReview} from "../../../Services/userServices";

function AddReview({ show, setShow, bookTitle }) {
  const toggleModal = () => setShow(!show);

  const initialValue = {
    review: "",
    
  };

  const [formValues, setFormValues] = useState(initialValue);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const data = {
    review: formValues.review,
    bookTitle:bookTitle
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    addReview(data).then((res) => {
      if (res.data.success) {
        toggleModal()
        message.success(<span style={{color: 'black' }}>Review added successfully</span>)


      }
    });
  };

  return (
    <MDBContainer fluid>
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={show}
        setShow={setShow}
        style={{ zIndex: show ? 9999 : -1 }}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader
              style={{
                justifyContent: "center",
                backgroundColor: "#d3d3d3",
                fontWeight: 600,
              }}
            >
              Add Review
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div class="form-outline">
                  <textarea
                    class="form-control"
                    id="textAreaExample"
                    name="review"
                    rows="4"
                    style={{width:'300px'}}
                    value={formValues.review} onChange={handleChange}
                  ></textarea>
                  <label class="form-label" for="textAreaExample">
                    Message
                  </label>
                </div>{" "}
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Cancel
              </MDBBtn>
              <MDBBtn color="black" onClick={handleSubmit}>
                Add Review
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}

export default AddReview;
