import axios from "axios";

const API_URL = "http://localhost:8080/api/projects";

class ProjectService {

    getAllProjects() {
        return axios.get(API_URL);
    }

    saveProject(project) {
        return axios.post(API_URL, project);
    }

    updateProject(id, project) {
        return axios.put(`${API_URL}/${id}`, project);
    }

    deleteProject(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new ProjectService();