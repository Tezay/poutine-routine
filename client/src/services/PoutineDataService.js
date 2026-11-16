import http from './http-common.js';

class PoutineDataService {
  getAll() {
    return http.get('/poutines');
  }
  openBox() {
    return http.post('/boxes');
  }
}

export default new PoutineDataService();
