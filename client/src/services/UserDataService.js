import http from './http-common.js';

class UserDataService {
  create(data) {
    return http.post('/user', data);
  }
  login(data) {
    return http.post('/user/login', data);
  }
  logout() {
    return http.post('/user/logout');
  }
  auth() {
    return http.get('/user/auth');
  }
  update(data) {
    return http.put('/user', data);
  }
  delete() {
    return http.delete('/user');
  }
}

export default new UserDataService();
