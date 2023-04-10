import React, {useState} from 'react';
import Swal from 'sweetalert2';
import './AddGenre.css'
import {
  MDBBtn,
  MDBContainer,
  MDBModalDialog,MDBModal,MDBModalContent,MDBModalFooter,MDBModalHeader,MDBModalBody,
  MDBInput
}
from 'mdb-react-ui-kit';
import { addGenreAPI } from '../../../Services/adminServices';
import './AddGenre.css'

function AddGenre( {show, setShow}) {
  

    const toggleModal = () => setShow(!show);

  const initialValue = {
    genre: "",
    
  };

  const [formValues, setFormValues] = useState(initialValue);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const data = {
    genre:formValues.genre
  }

  
const handleSubmit = (e) =>{
  e.preventDefault()
  
  addGenreAPI(data)
  .then((res)=>{
    if(res.data.exist){
      Swal.fire('genre already exist')
      toggleModal()
    }
    if(res.data.success){
      Swal.fire('genre added succesfully')
      toggleModal()
    }
  })
}

  return (
    <MDBContainer fluid>

<MDBModal staticBackdrop tabIndex='-1' show={show} setShow={setShow}  style={{ zIndex: show ? 9999 : -1 }}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader style={{justifyContent:'center',backgroundColor:'#d3d3d3',fontWeight:600}}>
              Add Genre
            </MDBModalHeader>
            <MDBModalBody>
              <form >
                <MDBInput wrapperClass='my-3 w-100' labelClass='text-grey' label='Genre' id='formControlLg' type='name' name='genre' value={formValues.genre} onChange={handleChange} size="lg" />
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary'onClick={toggleModal}>
                Cancel
              </MDBBtn>
              <MDBBtn color='black' onClick={handleSubmit}>
                Add Genre
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    </MDBContainer>
  );
}

export default AddGenre;

