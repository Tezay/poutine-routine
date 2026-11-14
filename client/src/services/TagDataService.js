import http from './http-common.js';

class TagDataService {
  getAll() {
    return http.get('/tags');
  }
}

export default new TagDataService();
