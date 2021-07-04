import axios from "axios";

const basePath = "localhost:8000"; // production mode - ""
const apiPrefix = "/api/v1";

const apiClient = axios.create({
  baseURL: basePath + apiPrefix,
  timeout: 1000,
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default apiClient;
