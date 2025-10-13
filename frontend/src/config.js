const API = process.env.NODE_ENV === 'production' 
 ?'https://mern-backend-production-b28c.up.railway.app/api'
  : 'http://localhost:3000/api';
export { API };

