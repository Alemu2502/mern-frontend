import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (location, path) => {
    if (location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
            <Link className="navbar-brand" to="/">Brand</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(location, "/")} to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(location, "/cart")} to="/cart">
                            Cart{" "}
                            <sup>
                                <small className="cart-badge">{itemTotal()}</small>
                            </sup>
                        </Link>
                    </li>
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(location, "/user/dashboard")} to="/user/dashboard">
                                Dashboard
                            </Link>
                        </li>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(location, "/admin/dashboard")} to="/admin/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(location, "/shop")} to="/shop">
                                    Shop
                                </Link>
                            </li>
                        </>
                    )}
                    {!isAuthenticated() && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(location, "/signin")} to="/signin">
                                    Signin
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(location, "/signup")} to="/signup">
                                    Signup
                                </Link>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(location, "/contact")} to="/contact">
                            Contact
                        </Link>
                    </li>
                    {isAuthenticated() && (
                        <li className="nav-item">
                            <span
                                className="nav-link"
                                style={{ cursor: "pointer", color: "#ffffff" }}
                                onClick={() =>
                                    signout(() => {
                                        navigate("/");
                                    })
                                }
                            >
                                Signout
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
