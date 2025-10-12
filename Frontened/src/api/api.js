import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // 👈 change this to your backend URL
});

export default API;
