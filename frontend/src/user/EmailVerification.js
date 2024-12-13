import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';

const EmailVerification = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await axios.post(`${API}/verify-email`, { token });
                setMessage('Your email has been verified successfully! Redirecting to sign in...');
                setIsError(false);
                setTimeout(() => {
                    navigate('/signin');
                }, 3000); // Redirect after 3 seconds
            } catch (error) {
                setMessage('Failed to verify email. Please try again.');
                setIsError(true);
            }
        };
        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="container mt-5">
            <h2>Email Verification</h2>
            <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                {message}
            </div>
        </div>
    );
};

export default EmailVerification;
