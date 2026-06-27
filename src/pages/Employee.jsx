import { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import ProjectService from "../services/ProjectService";

function Employee() {

    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);

    const [employee, setEmployee] = useState({
        employeeName: "",
        email: "",
        designation: "",
        projectId: ""
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadEmployees();
        loadProjects();
    }, []);

    const loadEmployees = () => {
        EmployeeService.getAllEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => console.log(error));
    };

    const loadProjects = () => {
        ProjectService.getAllProjects()
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => console.log(error));
    };

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (editingId === null) {

        EmployeeService.saveEmployee(employee)
            .then(() => {

                loadEmployees();

                setEmployee({
                    employeeName: "",
                    email: "",
                    designation: "",
                    projectId: ""
                });

            })
            .catch((error) => console.log(error));

    } else {

        EmployeeService.updateEmployee(editingId, employee)
            .then(() => {

                loadEmployees();

                setEditingId(null);

                setEmployee({
                    employeeName: "",
                    email: "",
                    designation: "",
                    projectId: ""
                });

            })
            .catch((error) => console.log(error));
    }
};

const deleteEmployee = (id) => {

    if (window.confirm("Are you sure?")) {

        EmployeeService.deleteEmployee(id)
            .then(() => {
                loadEmployees();
            })
            .catch((error) => console.log(error));
    }
};

const editEmployee = (employee) => {

    setEditingId(employee.employeeId);

    setEmployee({
        employeeName: employee.employeeName,
        email: employee.email,
        designation: employee.designation,
        projectId: employee.project.projectId
    });
};

return (
    <div className="container mt-4">

        <h2 className="text-center mb-4">Employee Management</h2>

        <form onSubmit={saveOrUpdateEmployee}>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Employee Name"
                name="employeeName"
                value={employee.employeeName}
                onChange={handleChange}
            />

            <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                value={employee.email}
                onChange={handleChange}
            />

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Designation"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
            />

            <select
                className="form-control mb-3"
                name="projectId"
                value={employee.projectId}
                onChange={handleChange}
            >
                <option value="">Select Project</option>

                {projects.map((project) => (
                    <option
                        key={project.projectId}
                        value={project.projectId}
                    >
                        {project.projectName}
                    </option>
                ))}

            </select>

            <div className="text-center">
                <button className="btn btn-success">
                    {editingId ? "Update" : "Save"}
                </button>
            </div>

        </form>

        <hr />

        <table className="table table-bordered table-hover">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Project</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>

                {employees.map((emp) => (

                    <tr key={emp.employeeId}>

                        <td>{emp.employeeId}</td>
                        <td>{emp.employeeName}</td>
                        <td>{emp.email}</td>
                        <td>{emp.designation}</td>
                        <td>{emp.project.projectName}</td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => editEmployee(emp)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteEmployee(emp.employeeId)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>
);

}

export default Employee;