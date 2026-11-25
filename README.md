# 🛍️ MERN E-Commerce Frontend

This is the frontend for a full-stack e-commerce application built with React. It connects to the backend API to support user authentication, email verification, category and product browsing, order placement, and more.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Routing](#routing)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [License](#license)

---

## ✨ Features

- User registration and login with JWT
- Email verification flow
- Protected routes for authenticated users
- Admin dashboard for category and product management
- Product listing and detail pages
- Cart and checkout functionality
- Order history and user profile
- Responsive design for mobile and desktop

---

## 🧰 Tech Stack

- **React**
- **React Router**
- **Axios**
- **Tailwind CSS / Bootstrap / Custom CSS**
- **Context API / Redux**
- **Vite / Webpack / Create React App**

---

## ⚙️ Installation

```bash
git clone https://github.com/yourusername/mern-frontend.git
cd frontend
npm install
npm start
```
## 🔐 Environment Variables
Create a .env file in the root directory and add:

VITE_API_URL=https://your-backend-api.com

Replace with your actual backend URL.
```
##🧭 Routing
Handled using react-router-dom. Example routes:

/ – Home

/signup – Register

/signin – Login

/verify-email/:token – Email verification

/dashboard – Admin dashboard

/products – Product listing

/cart – Shopping cart

/orders – Order history
```
##🔌 API Integration
All API calls are made using Axios. Example:
axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, userData);

```
##🚀 Deployment
You can deploy the frontend using:

Netlify

Vercel

GitHub Pages

Make sure to set your VITE_API_URL in the deployment environment settings.
```
##📄 License
This project is licensed under the MIT License.
