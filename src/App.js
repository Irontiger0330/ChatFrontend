
import PublicMessagesPage from './components/PublicMessagesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MessagePage from './pages/MessagePage';
import MessageBox from './pages/MessageBox';
import Message from './pages/Message';
import { BrowserRouter, Routes, Switch, Route, Link } from 'react-router-dom';
import React from 'react';

export default function App(props) {
    console.log("asd", props);
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* <Route path="/publicMessage" element={<PublicMessagesPage />} /> */}
                    <Route path="/messagePage" element={<MessagePage />} />
                    <Route path="/messageBox" element={<MessageBox />} />
                    <Route path="/message" element={<Message />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}