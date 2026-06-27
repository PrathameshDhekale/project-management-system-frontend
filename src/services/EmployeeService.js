import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";

class EmployeeService {

    getAllEmployees() {
        return axios.get(API_URL);
    }

    saveEmployee(employee) {
        return axios.post(API_URL, employee);
    }

    updateEmployee(id, employee) {
        return axios.put(`${API_URL}/${id}`, employee);
    }

    deleteEmployee(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new EmployeeService();