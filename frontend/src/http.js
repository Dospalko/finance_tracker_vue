import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual backend URL
});

export default http;
