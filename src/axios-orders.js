import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-application.firebaseio.com/'
});


export default instance;