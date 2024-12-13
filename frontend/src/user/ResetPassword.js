import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';

const ResetPassword = () => {
    const { token } = useParams();
    const [values, setValues] = useState({
        newPassword: '',
        confirmPassword: '',
        showPassword: false,
        message: ''
    });
    const [passwordStrength, setPasswordStrength] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isLongEnough: false
    });
    const [showPasswordStrength, setShowPasswordStrength] = useState(false);

    const navigate = useNavigate();

    const { newPassword, confirmPassword, showPassword, message } = values;

    const handleChange = name => event => {
        const value = event.target.value;
        setValues({ ...values, [name]: value });

        if (name === 'newPassword') {
            setShowPasswordStrength(true);
            const updatedStrength = {
                hasUpperCase: /[A-Z]/.test(value),
                hasLowerCase: /[a-z]/.test(value),
                hasNumber: /[0-9]/.test(value),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
                isLongEnough: value.length >= 8
            };
            setPasswordStrength(updatedStrength);
            if (Object.values(updatedStrength).every(strength => strength)) {
                setShowPasswordStrength(false);
            }
        }
    };

    const toggleShowPassword = () => {
        setValues({ ...values, showPassword: !showPassword });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setValues({ ...values, message: "Passwords do not match" });
            return;
        }
        try {
            const response = await axios.post(`${API}/reset-password`, { resetPasswordToken: token, newPassword });
            setValues({ ...values, message: response.data.message });
            setTimeout(() => {
                navigate('/signin');
            }, 3000);
        } catch (error) {
            setValues({ ...values, message: error.response.data.error });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={handleChange('newPassword')}
                            required
                            className="form-control"
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" onClick={toggleShowPassword} style={{ cursor: "pointer" }}>
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>
                    {showPasswordStrength && (
                        <div className="password-strength mt-2">
                            <p className={passwordStrength.hasUpperCase ? 'text-success' : 'text-danger'}>
                                {passwordStrength.hasUpperCase ? '✓' : '✗'} Uppercase letter
                            </p>
                            <p className={passwordStrength.hasLowerCase ? 'text-success' : 'text-danger'}>
                                {passwordStrength.hasLowerCase ? '✓' : '✗'} Lowercase letter
                            </p>
                            <p className={passwordStrength.hasNumber ? 'text-success' : 'text-danger'}>
                                {passwordStrength.hasNumber ? '✓' : '✗'} Number
                            </p>
                            <p className={passwordStrength.hasSpecialChar ? 'text-success' : 'text-danger'}>
                                {passwordStrength.hasSpecialChar ? '✓' : '✗'} Special character
                            </p>
                            <p className={passwordStrength.isLongEnough ? 'text-success' : 'text-danger'}>
                                {passwordStrength.isLongEnough ? '✓' : '✗'} Minimum 8 characters
                            </p>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        required
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ResetPassword;
