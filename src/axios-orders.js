import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-b4ea0.firebaseio.com/',
});

export default instance;
