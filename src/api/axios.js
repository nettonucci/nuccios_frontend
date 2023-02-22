import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((request) => {
    if (!request?.headers?.Authorization) {
        const companyToken = localStorage.getItem('token-company');
        if (companyToken && request?.headers) {
        request.headers.Authorization = `Bearer ${companyToken}`
        }
        const userToken = localStorage.getItem('token-user');
        if (userToken && request?.headers) {
          request.headers.Authorization = `Bearer ${userToken}`
          }
    }
    return request
})

export default api;