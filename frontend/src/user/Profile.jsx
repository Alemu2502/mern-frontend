import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { useParams } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        showPassword: false
    });

    const { token } = isAuthenticated();
    const { userId } = useParams();
    const { name, email, password, success, error, showPassword } = values;

    const [passwordStrength, setPasswordStrength] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isLongEnough: false
    });
    const [showPasswordStrength, setShowPasswordStrength] = useState(false);

    useEffect(() => {
        const init = (userId, token) => {
            read(userId, token).then(data => {
                if (data.error) {
                    setValues(v => ({ ...v, error: data.error }));
                } else {
                    setValues(v => ({ ...v, name: data.name, email: data.email }));
                }
            });
        };
        init(userId, token);
    }, [userId, token]);

    const handleChange = name => event => {
        const value = event.target.value;
        setValues({ ...values, error: '', success: false, [name]: value });

        if (name === 'password') {
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

    const clickSubmit = e => {
        e.preventDefault();
        update(userId, token, { name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        password: '',
                        success: true
                    });
                });
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Profile updated successfully!
        </div>
    );

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    type="text" 
                    onChange={handleChange('name')} 
                    className="form-control" 
                    value={name} 
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    type="email" 
                    onChange={handleChange('email')} 
                    className="form-control" 
                    value={email} 
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange('password')}
                        onFocus={() => setShowPasswordStrength(true)}
                        onBlur={() => setShowPasswordStrength(false)}
                        className="form-control"
                        value={password}
                        placeholder="Leave blank to keep the same"
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

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <h2 className="mb-4">Profile update</h2>
                    {showSuccess()}
                    {showError()}
                    {profileUpdate(name, email, password)}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
