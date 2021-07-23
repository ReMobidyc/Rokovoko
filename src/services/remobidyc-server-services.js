import http from "../http-commons";

class DataService {

  getAll() {
    return http.get("/runs");
  }

  get(id) {
    return http.get(`/runs/${id}`);
  }

  create(data) {
    return http.post("/register", data).then(res => {alert(res); console.log(res.data)});
  }

  update(id, data) {
    return http.put(`/runs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/runs/${id}`);
  }

}

export default DataService;