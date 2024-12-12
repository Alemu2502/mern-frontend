import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
        showPassword: false
    });

    const { email, password, loading, error, redirectToReferrer, showPassword } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const toggleShowPassword = () => {
        setValues({ ...values, showPassword: !showPassword });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data && data.error) {
                const errorMsg = data.error;
                if (errorMsg.includes('User with that email does not exist')) {
                    setValues({ 
                        ...values, 
                        error: <span>
                                    The email address you entered is not registered. Please <Link to="/signup">sign up</Link> first.
                               </span>, 
                        loading: false 
                    });
                } else {
                    setValues({ ...values, error: errorMsg, loading: false });
                }
            } else if (data) {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            } else {
                setValues({ 
                    ...values, 
                    error: "Something went wrong. Please try again.", 
                    loading: false 
                });
            }
        });
    };

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="email" className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password" className="text-muted">Password</label>
                <div className="input-group">
                    <input
                        onChange={handleChange("password")}
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        required
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" onClick={toggleShowPassword} style={{ cursor: "pointer" }}>
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>
                </div>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary btn-block">Submit</button>
            <p>
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Navigate to="/" />;
        }
    };

    return (
        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container col-12 col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
