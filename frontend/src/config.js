// config.js
const API = process.env.NODE_ENV === 'production' 
  ? 'http://192.168.236.91:3000/api' 
  : 'http://localhost:3000/api';
export { API };
