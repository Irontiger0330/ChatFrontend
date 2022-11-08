import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';


function App() {

    useEffect(() => {
        Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    },)

    const [emailValue, setEmail] = useState({ email: '' });
    const [passValue, setPass] = useState({ pass: '' });
    const navigate = useNavigate();

    const updataEmail = e => {
        setEmail({
            ...emailValue,
            email: e.target.value,
        })
    }

    const updataPass = e => {
        setPass({
            ...passValue,
            pass: e.target.value,
        })
    }

    const setLoginData = (e) => {

        axios.post('login', {
            email: e.email,
            password: e.pass
        }).then((response) => {
            console.log(response.data.data);
            if (response.status == 200) {
                navigate("/messagePage", { state: { data: response.data.data } });
            } else {
                console.log('why', response);
            }
        })
    }

    const submitButton = (e) => {
        const data = {
            email: emailValue.email,
            pass: passValue.pass
        }

        setLoginData(data);
    }

    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                            <p className="text-white-50 mb-3">Please enter your login and password!</p>

                            <MDBInput wrapperClass='mb-4 w-100' name='uemail' label='Email address' id='formControlLg' type='email' size="lg" onChange={updataEmail} value={emailValue.email} />
                            <MDBInput wrapperClass='mb-4 w-100' name='upass' label='Password' id='formControlLg' type='password' size="lg" onChange={updataPass} value={passValue.pass} />

                            <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
                            <a href='./register'>Register</a>
                            <MDBBtn size='lg' onClick={submitButton}>
                                Login
                            </MDBBtn>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default App;