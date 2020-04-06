import axios from 'axios';

//@todo: add handlers for connection errors to the base axios instance
const instance  = axios.create({
    baseURL: process.env.REACT_APP_CARPOOL_BACKEND_URL
});

export default instance;