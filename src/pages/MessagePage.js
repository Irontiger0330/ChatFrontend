import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import axios from 'axios';
import MessageBox from './MessageBox';
import { ChatBox } from './ChatBox';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';

export default function App() {

  Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  const location = useLocation();

  const [messValue, setMess] = useState({ text: '' });
  const [toHome, setToHome] = useState(false);
  const [showMess, setShowMess] = useState({ mess: [] });
  const [showChat, setShowChat] = useState({ chat: [] });
  const [to_id, setTo_id] = useState('');
  const [repeater,setRepeater]=useState(0)
  const [userData, setUserData] = useState
    ({
      user_id: '',
      user_name: ''
    });
  localStorage.setItem('user', JSON.stringify(location.state.data))
  const userDatas = JSON.parse(localStorage.getItem('user'));
  const userid = userDatas[0]['id'];

  const getUser = () => {
    setUserData({
      ...userData,
      // user_id: location.state.data[0].id,
      // user_name: location.state.data[0].name
    })
  }
  const messChange = e => {
    setMess({
      ...e.messValue,
      text: e.target.value

    })
  }
  const sendMessageBtn = () => {
    // if (to_id == '') {
    //   alert("select to_id")
    // } else {
    //   const data = {
    //     to_id: to_id,
    //     user_id: userid,
    //     message: messValue.text
    //   }
    //   createMessData(data);
    // }
    const data = {
      to_id: 1,
      user_id: userid,
      message: messValue.text
    }
    createMessData(data);

    showChatData();
  }

  const createMessData = (e) => {
    axios.post('createMessageData', {
      from_id: userid,
      to_id: to_id,
      message: e.message
    }).then((response) => {
      showMessData();
    })
  }

  const logouturl = () => {
    axios.post('logout').then((response) => {
      if (response.status == true) {
        setToHome(true);
      }

    })
  }

  const showChatData = (e) => {
    axios.post('showChatData').then((response) => {
      setShowChat({
        chat: response.data.message
      })
    })
  }

  const showMessData = () => {
    axios.post('showMessageData').then((response) => {
      setShowMess({
        mess: response.data.message
      })
    })
  }

  useEffect(() => {
    showMessData();
    showChatData();
    getUser();
    setTimeout(() => setRepeater(prevState=>prevState+1), 10000);
  }, [repeater])

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#CDC4F9" }}>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                  <div className="p-3">
                    <MDBInputGroup className="rounded mb-3">
                      <input
                        className="form-control rounded"
                        placeholder="Search"
                        type="search"
                      />
                      <span
                        className="input-group-text border-0"
                        id="search-addon"
                      >
                        <MDBIcon fas icon="search" />
                      </span>
                    </MDBInputGroup>

                    <div>
                      <MDBTypography listUnStyled className="mb-0">
                        {

                          showChat.chat.map((user, index) => (
                            <ChatBox chat={user} user_id={userid} onQuery={setTo_id} key={index} />
                          ))
                        }
                      </MDBTypography>
                    </div>
                  </div>
                </MDBCol>
                <MDBCol md="6" lg="7" xl="8">
                  <a href="./logout" >logout</a>
                  {
                    <MessageBox messages={showMess} user_id={userid} to_id={to_id} />
                  }
                  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 3"
                      style={{ width: "40px", height: "100%" }}
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput2"
                      placeholder="Type message"
                      onChange={messChange}
                      value={messValue.text}
                    />
                    <a className="ms-3" >
                      <MDBBtn fas icon="paper-plane" onClick={sendMessageBtn} >Send</MDBBtn>
                    </a>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );

}