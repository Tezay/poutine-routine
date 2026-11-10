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
}

export default new UserDataService();
