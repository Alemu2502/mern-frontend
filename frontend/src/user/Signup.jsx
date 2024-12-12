import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        showPassword: false
    });

    const { name, email, password, success, error, showPassword } = values;
    const [passwordStrength, setPasswordStrength] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isLongEnough: false
    });
    const [showPasswordStrength, setShowPasswordStrength] = useState(false);

    const handleChange = name => event => {
        const value = event.target.value;
        setValues({ ...values, error: false, [name]: value });

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

    const isPasswordStrong = () => {
        return (
            passwordStrength.hasUpperCase &&
            passwordStrength.hasLowerCase &&
            passwordStrength.hasNumber &&
            passwordStrength.hasSpecialChar &&
            passwordStrength.isLongEnough
        );
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // Ensures at least two characters for TLD
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        return isPasswordStrong() && !password.toLowerCase().includes(name.toLowerCase()) && !password.toLowerCase().includes(email.split('@')[0].toLowerCase());
    };

    const clickSubmit = event => {
        event.preventDefault();
        if (!name || !email || !password) {
            setValues({ ...values, error: 'All fields are required', success: false });
            return;
        }
        if (!isEmailValid(email)) {
            setValues({ ...values, error: 'Invalid email format', success: false });
            return;
        }
        if (!isPasswordStrong()) {
            setValues({ ...values, error: 'Password does not meet strength requirements', success: false });
            return;
        }
        if (!isPasswordValid(password)) {
            setValues({ ...values, error: 'Your password cannot contain your personal information', success: false });
            return;
        }
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then(response => {
                if (response.error) {
                    if (response.error === 'Email already exists. Please sign in.') {
                        setValues({
                            ...values,
                            error: <span>{response.error} Please <Link to="/signin">sign in</Link>.</span>,
                            success: false
                        });
                    } else {
                        setValues({
                            ...values,
                            error: response.error,
                            success: false
                        });
                    }
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    });
                }
            })
            .catch(err => {
                console.log('Error occurred:', err);
                setValues({
                    ...values,
                    error: 'Failed to create account. Please try again.',
                    success: false
                });
            });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} required />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} required />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <div className="input-group">
                    <input
                        onChange={handleChange('password')}
                        onFocus={() => setShowPasswordStrength(true)}
                        onBlur={() => setShowPasswordStrength(false)}
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        required
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

            <button onClick={clickSubmit} className="btn btn-primary btn-block">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            <h4>Account Created Successfully!</h4>
            <p>
                Please check your inbox to verify your email address. You can now 
                <Link to="/signin" className="alert-link"> sign in</Link> once verified.
            </p>
        </div>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-12 col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
