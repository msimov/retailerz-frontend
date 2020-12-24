import axios from 'axios';
import http from '../commons/http.common';

class UserService {

    create = (data) =>
        http.post('/users', data);

    findById = (id) =>
        http.get(`/users/${id}`);

    getAll = () =>
        http.get("/users");
    
    updateById = (id, data) =>
        http.put(`/users/${id}`, data);
    
    deleteById = (id) =>
        http.delete(`/users/${id}`);
}

export default new UserService();