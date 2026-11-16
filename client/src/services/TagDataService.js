import http from './http-common.js';

class TagDataService {
  getAll() {
    return http.get('/tags');
  }

  create(data) {
    return http.post('/tags', data);
  }

  update(id, data) {
    return http.put(`/tags/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tags/${id}`);
  }
}

export default new TagDataService();
