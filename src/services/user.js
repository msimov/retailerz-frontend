import http from '../commons/http.commons'

class UserService {

    create = (data, token) =>
        http.post('/users', data, {headers: {authorization: `Bearer ${token}`}});

    findById = (id) =>
        http.get(`/users/${id}`);

    getAll = (id) =>
        http.get("/users")
    
    updateById = (id, data) =>
        http.put(`/users/${id}`, data);
    
    deleteById = (id) =>
        http.delete(`/users/${id}`);
}

export default new UserService();