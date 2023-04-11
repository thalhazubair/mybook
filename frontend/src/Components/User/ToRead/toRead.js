import React, {useState, useEffect} from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import './toRead.css'
import { getFavourite, getUserDetailsAPI, getReserved } from '../../../Services/userServices';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom';

function ToRead() {
    const [open, setOpen] = useState(false);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [book, setBookData] = useState([])
    const [data, setNewData] = useState([])
    const navigate = useNavigate()

  
  
    useEffect(()=>{

      getUserDetailsAPI()  
      .then((res) => {
        if(res.data.blocked){
          navigate('/')
          localStorage.removeItem('userToken');
          message.error(<span style={{color: 'black' }}>Sorry, You Have Been Blocked</span>)
        }
      })

      getReserved()
      .then(res=>{setBookData(res.data.results)})
      .catch(err=>console.log(err))
  
      getFavourite()
      .then(res=>{setNewData(res.data.results)})
      .catch(err=>console.log(err))
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    return (
      <div className='toread-main'>
        <h1>
          <span className='toRead'>Reserved Book</span>
        </h1>
  
        <div className="toReadBook-container-list">
          {book.map((item, index) => {
            let thumbnail = item.imagelinks
            return (
              <div
                key={index}
                className="toReadBook-container"
                onClick={() => {
                  setSelectedThumbnail(thumbnail);
                  setTitle(item.title)
                  setAuthor(item.authors[0].name)
                  setOpen(true);
                }}
              >
                <img src={thumbnail} alt="" />
              </div>
            );
          })}
        </div>
  
        <h1>
          <span className='toRead'>Favourites</span>
        </h1>
        <div className="toReadBook-container-list">
          {data.map((item, index) => {
            let thumbnail = item.imagelinks
            return (
              <div key={index} className="toReadBook-container"
              onClick={() => {
                setSelectedThumbnail(thumbnail);
                setTitle(item.title)
                setAuthor(item.authors[0].name)
                setOpen(true);
              }}
              >
                <img src={thumbnail} alt="" />
              </div>
            );
          })}
        </div>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          
        >
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image
              size="medium"
              src={selectedThumbnail}
              wrapped
            />
            <Modal.Description>
              <Header><span>Title : {title}</span></Header>
              <p className="modal-paragraph">
                We've found the following gravatar image associated with your
                e-mail address.
              </p>
              <p className="modal-author">author : {author}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
}

export default ToRead