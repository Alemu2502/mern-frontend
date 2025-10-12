import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = isAuthenticated();

  return (
    <Layout
      title="Dashboard"
      description={`Welcome ${user?.name || 'Admin'}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">
          <div className="card" >
            <h4 className="card-header text-primary">Admin Links</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <Link className="nav-link text-success" to="/create/category">Create Category</Link>
              </li>
              <li className="list-group-item">
                <Link className="nav-link text-success" to="/create/product">Create Product</Link>
              </li>
              <li className="list-group-item">
                <Link className="nav-link text-success" to="/admin/orders">View Orders</Link>
              </li>
              <li className="list-group-item">
                <Link className="nav-link text-success" to="/admin/products">Manage Products</Link>
              </li>
              <li className="list-group-item">
                <Link className="nav-link text-success" to="/admin/categories">Manage Categories</Link>
              </li>
              <li className="list-group-item">
                <Link className="nav-link text-success" to="/admin/users">Manage Users</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-9">
          <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">{user?.name}</li>
              <li className="list-group-item">{user?.email}</li>
              <li className="list-group-item">{user?.role === 1 ? "Admin" : "Registered User"}</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
