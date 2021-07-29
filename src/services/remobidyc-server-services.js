import { http } from "../http-commons";

const getAll = () => {
  return http.get("/runs");
};

const getSimulation = (id) => {
  return http.get(`/runs/${id}`);
};

const createSimulation = (data) => {
  return http.post("/register", data);
};

const updateSimulation = (id, data) => {
  return http.put(`/runs/${id}`, data);
};

const deleteSimulation = (id, tokenValue) => {
  return http.delete(`/runs/${id}`, {
    headers: { Authorization: "*" },
    data: { token: tokenValue },
  });
};

const httpService = {
  getAll,
  getSimulation,
  createSimulation,
  updateSimulation,
  deleteSimulation,
};
export default httpService;
