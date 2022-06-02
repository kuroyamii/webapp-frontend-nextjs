import axios from "axios";
import projectConfig from "./project-config";

const BaseAPI = axios.create({
  baseURL: projectConfig.ProjectURL,
  withCredentials: true,
});

export default BaseAPI;
