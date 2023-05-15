import axios from 'axios';
import _ from 'lodash';
// import config from './config';

const instance = axios.create({
    baseURL: 'http://192.168.1.30:8080/', //ở nhà
    // baseURL: 'http://192.168.25.74:8080/', //wwifi dt
    // baseURL: 'http://192.168.2.153:8080/', //ở trường
    // baseURL: 'http://10.23.12.52:8080/'
    // baseURL: 'http://192.168.2.153:8080/'

});
instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
    }
);

export default instance;