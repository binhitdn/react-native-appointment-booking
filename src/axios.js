import axios from 'axios';
import _ from 'lodash';
// import config from './config';

const instance = axios.create({
    baseURL: 'http://192.168.1.30:8080/', //ở nhà
    // baseURL: 'http://192.168.43.74:8080/', //wifi đt
    // baseURL: 'http://192.168.2.156:8080/'
    // withCredentials: true
    // baseURL: 'http://10.50.72.49:8080/'
});
instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
    }
);

export default instance;