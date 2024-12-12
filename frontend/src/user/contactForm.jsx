import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../core/Layout'; // Assuming you have a Layout component
import { API } from '../config';
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        error: '',
        success: ''
    });

    const { name, email, message, error, success } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, error: '', success: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/contact`, {
                name,
                email,
                message
            });
            setFormData({ ...formData, success: 'Message sent successfully!', name: '', email: '', message: '' });
        } catch (error) {
            setFormData({ ...formData, error: 'Failed to send message, please try again.' });
        }
    };

    return (
        <Layout
            title="Contact Me"
            description="Feel free to reach out to me using the form below"
            className="container col-12 col-md-8 offset-md-2"
        >
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="card p-4">
                        <h4 className="card-title text-center mb-4">Get in Touch</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="text-muted">Name</label>
                                <input type="text" name="name" className="form-control" value={name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Email</label>
                                <input type="email" name="email" className="form-control" value={email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Message</label>
                                <textarea name="message" className="form-control" rows="6" value={message} onChange={handleChange} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Send</button>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            {success && <div className="alert alert-success mt-3">{success}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ContactForm;
