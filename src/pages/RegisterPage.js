import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Navigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';


function App() {

    const [emailValue, setEmail] = useState({ email: '' });
    const [nameValue, setName] = useState({ name: '' });
    const [passValue, setPass] = useState({ pass: '' });
    const [toLogin, setToLogin] = useState(false);

    const addEmail = e => {
        setEmail({
            ...emailValue,
            email: e.target.value
        })
    }

    const addName = e => {
        setName({
            ...nameValue,
            name: e.target.value
        })
    }

    const addPass = e => {
        setPass({
            ...passValue,
            pass: e.target.value
        })
    }

    const setUserData = (e) => {

        Axios.post('register', {
            name: e.name,
            email: e.email,
            password: e.pass
        }).then((response) => {
            if (response.status == 200) {
                setToLogin(true);
            } else {
                console.log('failed');
            }

        })
    }

    const submitButton = (e) => {
        const data = {
            name: nameValue.name,
            email: emailValue.email,
            pass: passValue.pass
        }

        setUserData(data);
    }

    useEffect(() => {
        Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    })

    if (toLogin) {
        return <Navigate replace to={"/login"} />
    } else {
        return (
            <MDBContainer fluid>
    
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>
    
                        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                            <a href='./login'>login</a>
    
                                <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                                <p className="text-white-50 mb-3">Please enter your details!</p>
                                <MDBInput wrapperClass='mb-4 w-100' label='User name' id='formControlLg' type='text' size="lg" onChange={addName} value={nameValue.name} />
                                <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={addEmail} value={emailValue.email} />
                                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={addPass} value={passValue.pass} />
    
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
    
                                <MDBBtn size='lg' onClick={submitButton}>
                                    Sign Up
                                </MDBBtn>
    
                                <hr className="my-4" />
    
                            </MDBCardBody>
                        </MDBCard>
    
                    </MDBCol>
                </MDBRow>
    
            </MDBContainer>
        );
    }
}

export default App;