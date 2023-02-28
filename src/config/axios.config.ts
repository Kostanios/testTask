import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://test.vmarmysh.com'
});

export default axiosInstance;
