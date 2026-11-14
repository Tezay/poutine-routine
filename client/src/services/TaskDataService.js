import http from './http-common.js';

class TaskDataService {
  getAll() {
    return http.get('/tasks');
  }
  create(data) {
    return http.post('/tasks', data);
  }
  update(id, data) {
    return http.put(`/tasks/${id}`, data);
  }
  move(id, status) {
    return http.put(`/tasks/${id}/move`, { status });
  }
  delete(id) {
    return http.delete(`/tasks/${id}`);
  }
}

export default new TaskDataService();
