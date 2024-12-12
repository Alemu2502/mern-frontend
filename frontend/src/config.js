// config.js
const API = process.env.NODE_ENV === 'production' 
  ? 'https://mern-backend-pigq.onrender.com/api' 
  : 'http://localhost:3000/api';
export { API };
