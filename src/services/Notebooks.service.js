import http from "../http-common";

class NotebooksDataService {
  getAll() {
    return http.get("/Notebooks");
  }

  get(id) {
    return http.get(`/Notebooks/${id}`);
  }

  create(data) {
    return http.post("/Notebooks", data);
  }

  update(id, data) {
    return http.put(`/Notebooks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Notebooks/${id}`);
  }

  deleteAll() {
    return http.delete(`/Notebooks`);
  }

  findByTitle(title) {
    return http.get(`/Notebooks?title=${title}`);
  }
}

export default new NotebooksDataService();